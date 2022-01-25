package com.exam.repository;

import java.util.Set;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question,Long>{

    Set<Question> findByQuiz(Quiz quiz);
    
}
