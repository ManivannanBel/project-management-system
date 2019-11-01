package com.project_management.belfazt.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project_management.belfazt.domain.Backlog;
import com.project_management.belfazt.domain.Project;
import com.project_management.belfazt.domain.ProjectTask;
import com.project_management.belfazt.exceptions.ProjectNotFoundException;
import com.project_management.belfazt.repository.BacklogRepository;
import com.project_management.belfazt.repository.ProjectRepository;
import com.project_management.belfazt.repository.ProjectTaskRepository;

@Service
public class ProjectTaskService {

		@Autowired
		private BacklogRepository backlogRepository;
		
		@Autowired
		private ProjectTaskRepository projectTaskRepository;
		
		@Autowired
		private ProjectRepository projectRepository;
		
		public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
		
			try {
				//PT to be added to a specific project, project != null, Backlog exists
				Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
				//set backlog to projectTask
				projectTask.setBacklog(backlog);
				//Get the project sequence from backlog
				Integer backlogSequence = backlog.getPTSequence();
				//update it
				backlogSequence++;
				//set it back to backlog
				backlog.setPTSequence(backlogSequence);
				//////backlogRepository.save(backlog);
				//add backlog sequence to the project task
				projectTask.setProjectSequence(projectIdentifier+"-"+backlogSequence);
				//Add Project identifier to project task
				projectTask.setProjectIdentifier(projectIdentifier);
	
				//Initial priority when priority null
				if( projectTask.getPriority() == null || projectTask.getPriority() == 0) {
					projectTask.setPriority(5);
				}
				
				//Initial status when status null
				if(projectTask.getStatus() == null || projectTask.getStatus().equals("")) {
					projectTask.setStatus("TO_DO");
				}
				
				return projectTaskRepository.save(projectTask);
			}catch (Exception e) {
				throw new ProjectNotFoundException("Project not found");
			}
		}
		
		public Iterable<ProjectTask> findBacklogById(String projectIdentifier){
			
			Project project = projectRepository.findByProjectIdentifier(projectIdentifier);
			
			if(project == null) {
				throw new ProjectNotFoundException("Project with ID: '"+projectIdentifier+"' does not exists");
			}
			
			return projectTaskRepository.findByProjectIdentifierOrderByPriority(projectIdentifier);
		}
		
		public ProjectTask findProjectTaskByProjectSequence(String backlogId, String projectSequence) {
			
			//make sure PT searched on the correct backlog
			
			return projectTaskRepository.findByProjectSequence(projectSequence);
		}

}
