package com.project_management.belfazt.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project_management.belfazt.domain.Project;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long>{

}
