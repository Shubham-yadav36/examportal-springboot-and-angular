package com.exam.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.exam.dto.QuestionDTO;
import com.exam.dto.QuizDTO;
import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.services.QuestionService;
import com.exam.services.QuizService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;

    // to add the question
    @PostMapping("/")
    public ResponseEntity<?> addQuestion(@RequestBody QuestionDTO questionDTO) {
        try {
            QuestionDTO question = this.questionService.addQuestion(questionDTO);
            return new ResponseEntity<>(question, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // to update the question
    @PutMapping("/")
    public ResponseEntity<?> upateQuestion(@RequestBody QuestionDTO questionDTO) {
        try {
            QuestionDTO question = this.questionService.updateQuestion(questionDTO);
            return new ResponseEntity<>(question, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // to get a question
    @GetMapping("/{questionId}")
    public ResponseEntity<?> getQuestion(@PathVariable("questionId") Long questionId) {
        try {
            QuestionDTO question = this.questionService.getQuestion(questionId);
            return new ResponseEntity<>(question, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // to get all questions
    @GetMapping("/")
    public ResponseEntity<Set<QuestionDTO>> getAllQuestion() {
        try {
            Set<QuestionDTO> questions = this.questionService.getQuestions();
            return new ResponseEntity<>(questions, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.emptySet(), HttpStatus.OK);
        }
    }

    // to get all question of quiz for normal user
    @GetMapping("/quiz/{qId}")
    public ResponseEntity<List<QuestionDTO>> getQuestionsOfQuiz(@PathVariable("qId") Long qId) {
        try {
            List<QuestionDTO> questions = this.questionService.getQuestionsOfQuizForUser(qId);
            return new ResponseEntity<>(questions, HttpStatus.OK);
        } catch (Exception e) {
            List<QuestionDTO> questions = this.questionService.getQuestionsOfQuizForUser(qId);
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.OK);
        }
    }

    // to get all question of quiz for admin
    @GetMapping("/quiz/all/{qId}")
    public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("qId") Long qId,Pageable pageable) {
        try {
            return new ResponseEntity<>(this.questionService.getQuestionsOfQuiz(qId,pageable), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    // to delete the question
    @DeleteMapping("/{questionId}")
    public void deleteQuestion(@PathVariable("questionId") Long questionId) {
        try {
            this.questionService.deleteQuestion(questionId);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //	to get question by id
    @GetMapping("/getQuestion/{qId}")
    public ResponseEntity<?> getQuestionById(@PathVariable("qId") Long qId) {
        try {
            return new ResponseEntity<>(this.questionService.getQuestionById(qId), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //	evaluate result
    @PostMapping("/eval-result")
    public ResponseEntity<Map<String, Object>> evaluateResult(@RequestBody List<QuestionDTO> questionDTOS) {
        Map<String, Object> result = this.questionService.generateResult(questionDTOS);
        return new ResponseEntity(result, HttpStatus.OK);
    }

}
