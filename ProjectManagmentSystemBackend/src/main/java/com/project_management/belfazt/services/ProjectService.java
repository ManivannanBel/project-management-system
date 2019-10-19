package com.project_management.belfazt.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project_management.belfazt.domain.Project;
import com.project_management.belfazt.exceptions.ProjectIdException;
import com.project_management.belfazt.repository.ProjectRepository;

@Service
public class ProjectService {

	@Autowired
	private ProjectRepository projectRepository;
	
	public Project saveOrUpdateProject(Project project) {
		try {
			project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
			return projectRepository.save(project);			
		}catch (Exception e) {
			throw new ProjectIdException("Project ID '"+ project.getProjectIdentifier().toUpperCase() + "' already exists");
		}
	}
	
	public Project findProjectByIdentifier(String projectId) {
		
		Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
		
		if(project == null) {
			throw new ProjectIdException("Project ID '"+ projectId.toUpperCase() + "' not found");
		}
		
		return project;
	}
	
	public Iterable<Project> findAllProjects(){
		return projectRepository.findAll();
	}
	
	public void deleteProjectByIdentifier(String projectId) {
		Project project = findProjectByIdentifier(projectId);
		
		if(project == null) {
			throw new ProjectIdException("Project ID not "+ projectId +" found");
		}
		
		projectRepository.delete(project);
	}
}
