package com.project_management.belfazt.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project_management.belfazt.domain.ProjectTask;

@Repository
public interface ProjectTaskRepository extends CrudRepository<ProjectTask, Long>{
	
	List<ProjectTask> findByProjectIdentifierOrderByPriority(String projectIdentifier);

	ProjectTask findByProjectSequence(String projectSequence);
}
