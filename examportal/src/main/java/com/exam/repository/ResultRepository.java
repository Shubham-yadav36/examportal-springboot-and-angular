package com.exam.repository;

import java.util.List;

import com.exam.model.User;
import com.exam.model.exam.Quiz;
import com.exam.model.exam.Result;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ResultRepository extends JpaRepository<Result,Long> {
    public Result findByUserAndQuiz(User user, Quiz quiz);

    public List<Result> findByUser(User user);
}
