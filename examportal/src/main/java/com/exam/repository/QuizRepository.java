package com.exam.repository;

import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;

import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz,Long> {

	public Set<Quiz> findBycategory(Category category);
    
	public List<Quiz> findByActive(Boolean status);
	public Page<Quiz> findByActive(Boolean status,Pageable Pageable);
	
	public Set<Quiz> findByCategoryAndActive(Category category,Boolean status);
	public Set<Quiz> findByTitleContaining(String query);
}
