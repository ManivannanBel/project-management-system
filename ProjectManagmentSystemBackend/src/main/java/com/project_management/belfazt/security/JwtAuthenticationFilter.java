package com.project_management.belfazt.security;

import static com.project_management.belfazt.security.SecurityConstants.HEADER_STRING;
import static com.project_management.belfazt.security.SecurityConstants.TOKEN_PREFIX;

import java.io.IOException;
import java.util.Collections;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.project_management.belfazt.model.User;
import com.project_management.belfazt.services.CustomUserDetailService;

public class JwtAuthenticationFilter extends OncePerRequestFilter{

	@Autowired
	private JWTTokenProvider jWTTokenProvider;
	
	@Autowired
	private CustomUserDetailService customUserDetailService;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		try {
			String jwt = getJWTFromRequest(request);
			
			if(StringUtils.hasText(jwt) && jWTTokenProvider.validateToken(jwt)) {
				
				Long userId = jWTTokenProvider.getUserIdFromJWT(jwt);
				User userDetails = customUserDetailService.loadUserById(userId);
			
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						userDetails, null, Collections.emptyList()
				);
				
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				// After setting the Authentication in the context, we specify
				// that the current user is authenticated. So it passes the
				// Spring Security Configurations successfully.
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
			
		}catch (Exception e) {
			logger.error("cannot set user authentication in security context");
		}
		
		filterChain.doFilter(request, response);
		
	}

	private String getJWTFromRequest(HttpServletRequest request) {
		String bearerToken = request.getHeader(HEADER_STRING);
		
		if(StringUtils.hasText(bearerToken) && bearerToken.startsWith(TOKEN_PREFIX)) {
			return bearerToken.substring(7);
		}
		return null;
	}
	
}
