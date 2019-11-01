package com.project_management.belfazt.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project_management.belfazt.domain.Backlog;
import com.project_management.belfazt.domain.ProjectTask;
import com.project_management.belfazt.repository.BacklogRepository;
import com.project_management.belfazt.repository.ProjectTaskRepository;

@Service
public class ProjectTaskService {

		@Autowired
		private BacklogRepository backlogRepository;
		
		@Autowired
		private ProjectTaskRepository projectTaskRepository;
		
		public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
		
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
				
		}
		
		public Iterable<ProjectTask> findBacklogById(String projectIdentifier){
			return projectTaskRepository.findBacklogByProjectIdentifier(projectIdentifier);
		}
		
		
	
}
