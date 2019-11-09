package com.project_management.belfazt.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project_management.belfazt.dao.BacklogRepository;
import com.project_management.belfazt.dao.ProjectRepository;
import com.project_management.belfazt.dao.UserRepository;
import com.project_management.belfazt.exceptions.ProjectIdException;
import com.project_management.belfazt.exceptions.ProjectNotFoundException;
import com.project_management.belfazt.model.Backlog;
import com.project_management.belfazt.model.Project;
import com.project_management.belfazt.model.User;

@Service
public class ProjectService {

	@Autowired
	private ProjectRepository projectRepository;
	@Autowired
	private BacklogRepository backlogRepository;
	@Autowired
	private UserRepository userRepository;
	
	public Project saveOrUpdateProject(Project project, String username) {
		try {
	
			User user = userRepository.findByUsername(username);
			
			project.setUser(user);
			
			project.setProjectLeader(user.getUsername());
			
			project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
			
			//Create Backlog only while creating a project
			if(project.getId() == null) {
				//Create backlog table
				Backlog backlog = new Backlog();
				//Create relationship
				project.setBacklog(backlog);
				backlog.setProject(project);
				backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
			}
			
			//While updating the project
			if(project.getId() != null) {
				project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));
			}
			
			return projectRepository.save(project);			
		}catch (Exception e) {
			throw new ProjectIdException("Project ID '"+ project.getProjectIdentifier().toUpperCase() + "' already exists");
		}
	}
	
	public Project findProjectByIdentifier(String projectId, String username) {
		
		//Get the project from the repository
		Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
		
		//Check if the project exists
		if(project == null) {
			throw new ProjectIdException("Project ID '"+ projectId.toUpperCase() + "' not found");
		}
		
		//To prevent getting projects from other users using id
		if(!project.getProjectLeader().equals(username)) {
			throw new ProjectNotFoundException("Project not found");
		}
		
		return project;
	}
	
	public Iterable<Project> findAllProjects(String username){
		return projectRepository.findAllByProjectLeader(username);
	}
	
	public void deleteProjectByIdentifier(String projectId, String username) {
		//Get the user's project by identifier
		Project project = findProjectByIdentifier(projectId, username);
		
		if(project == null) {
			throw new ProjectIdException("Project ID not "+ projectId +" found");
		}
		
		//Delete the project
		projectRepository.delete(project);
	}
}
