package com.project_management.belfazt.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project_management.belfazt.dao.BacklogRepository;
import com.project_management.belfazt.dao.ProjectRepository;
import com.project_management.belfazt.dao.ProjectTaskRepository;
import com.project_management.belfazt.exceptions.ProjectNotFoundException;
import com.project_management.belfazt.model.Backlog;
import com.project_management.belfazt.model.Project;
import com.project_management.belfazt.model.ProjectTask;

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
			
			//make sure PT is searched on existing backlog
			Backlog backlog = backlogRepository.findByProjectIdentifier(backlogId.toUpperCase());
			if(backlog == null) {
				throw new ProjectNotFoundException("Project with ID: '"+backlogId.toUpperCase()+"' does not exists");
			}
			
			//make sure the task exists
			ProjectTask projectTask = projectTaskRepository.findByProjectSequence(projectSequence.toUpperCase());
			if(projectTask == null) {
				throw new ProjectNotFoundException("Project task  '"+projectSequence.toUpperCase()+"'  not found");
			}
			
			//make sure PT searched on the correct backlog
			if(!projectTask.getProjectIdentifier().equals(backlogId.toUpperCase())) {
				throw new ProjectNotFoundException("Project task  '"+projectSequence.toUpperCase()+"'  not exist in the project "+backlogId.toUpperCase());
			}
			
			return projectTaskRepository.findByProjectSequence(projectSequence.toUpperCase());
		}
		
		public ProjectTask updateProjectTaskByProjectSequence(ProjectTask updatedTask, String projectIdentifier, String projectSequence) {
			
			ProjectTask projectTask = findProjectTaskByProjectSequence(projectIdentifier, projectSequence);
			
			projectTask = updatedTask;
			
			return projectTaskRepository.save(projectTask);
		}
		
		public void deleteProjectTaskByProjectSequence(String projectIdentifier, String projectSequence) {
			
			ProjectTask projectTask = findProjectTaskByProjectSequence(projectIdentifier, projectSequence);
			
			projectTaskRepository.delete(projectTask);
			
		}

}
