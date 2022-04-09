package com.exam.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;

public interface QuestionRepository extends JpaRepository<Question,Long>{

    Page<Question> findByQuiz(Quiz quiz, Pageable pageable);
    
}
