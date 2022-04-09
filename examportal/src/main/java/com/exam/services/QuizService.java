package com.exam.services;

import java.util.List;
import java.util.Set;

import com.exam.dto.PageResponse;
import com.exam.dto.QuizDTO;

import org.springframework.data.domain.Pageable;

public interface QuizService {
    public QuizDTO addQuiz(QuizDTO quizDTO);

    public QuizDTO getQuiz(Long quizId);

    public QuizDTO updateQuiz(QuizDTO quizDTO);

    public PageResponse<Set<QuizDTO>> getQuizzes(Pageable pageable);

    public void deleteQuiz(Long quizId);

    public Set<QuizDTO> getQuizOfCategory(Long catId);

    public List<QuizDTO> getByActiveQuizzes(Boolean status);

    public PageResponse<List<QuizDTO>> getByActiveQuizzes(Boolean status, Pageable pageable);

    public Set<QuizDTO> getByCategoryAndActiveQuizzes(Long catId, Boolean status);

    public Set<QuizDTO> getSearchedQuizzes(String query);

}
