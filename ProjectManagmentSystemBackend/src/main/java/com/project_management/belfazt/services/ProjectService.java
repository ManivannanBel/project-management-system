package com.project_management.belfazt.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project_management.belfazt.dao.BacklogRepository;
import com.project_management.belfazt.dao.ProjectRepository;
import com.project_management.belfazt.exceptions.ProjectIdException;
import com.project_management.belfazt.model.Backlog;
import com.project_management.belfazt.model.Project;

@Service
public class ProjectService {

	@Autowired
	private ProjectRepository projectRepository;
	@Autowired
	private BacklogRepository backlogRepository;
	
	public Project saveOrUpdateProject(Project project) {
		try {
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
