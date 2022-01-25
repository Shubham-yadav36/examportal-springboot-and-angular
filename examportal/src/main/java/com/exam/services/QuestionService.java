package com.exam.services;

import java.util.List;
import java.util.Map;
import java.util.Set;

import com.exam.dto.QuestionDTO;
import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;

public interface QuestionService {
    public QuestionDTO addQuestion(QuestionDTO questionDTO);

    public QuestionDTO getQuestion(Long questionId);

    public QuestionDTO updateQuestion(QuestionDTO question);

    public Set<QuestionDTO> getQuestions();

    public void deleteQuestion(Long questionId);

    public Set<QuestionDTO> getQuestionsOfQuiz(Long quizId);

    public QuestionDTO getQuestionById(Long questionId);

    public List<QuestionDTO> getQuestionsOfQuizForUser(Long quizId);

    public Map<String, Object> generateResult(List<QuestionDTO> questionDTOS);

}
