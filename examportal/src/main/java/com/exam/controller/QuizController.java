package com.exam.controller;

import java.util.Collections;
import java.util.List;
import java.util.Set;

import com.exam.dto.PageResponse;
import com.exam.dto.QuizDTO;
import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;
import com.exam.services.QuizService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
@RequestMapping("/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    // to add quiz
    @PostMapping("/")
    public ResponseEntity<?> addQuiz(@RequestBody QuizDTO quizDTO) {
        try {
            return new ResponseEntity<QuizDTO>(this.quizService.addQuiz(quizDTO), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<String>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // to update the quiz 
    @PutMapping("/")
    public ResponseEntity<?> updateQuiz(@RequestBody QuizDTO quizDTO) {
        try {
            return new ResponseEntity<QuizDTO>(this.quizService.updateQuiz(quizDTO), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // get quiz by id 
    @GetMapping("/{quizId}")
    public ResponseEntity<?> getQuiz(@PathVariable("quizId") Long quizId) {

        try {
            return new ResponseEntity<QuizDTO>(this.quizService.getQuiz(quizId), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // get all quizzes
    @GetMapping("/")
    public ResponseEntity<Set<QuizDTO>> getAllQuiz() {
        try {
            return new ResponseEntity<>(this.quizService.getQuizzes(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.emptySet(), HttpStatus.OK);
        }
    }

    // to delete quiz
    @DeleteMapping("/{quizId}")
    public ResponseEntity<String> deleteQuiz(@PathVariable("quizId") Long quizId) {
        try {
            this.quizService.deleteQuiz(quizId);
            return new ResponseEntity<>("Deleted", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Not Deleted", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //    get quiz of category
    @GetMapping("/category/{catId}")
    public ResponseEntity<Set<QuizDTO>> getQuizOfCategory(@PathVariable("catId") Long catId) {
        try {
            return new ResponseEntity<>(this.quizService.getQuizOfCategory(catId), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.emptySet(), HttpStatus.OK);
        }
    }

    //    get active quizzes
    @GetMapping("/active")
    public ResponseEntity<List<QuizDTO>> getActiveQuizzes() {
        try {
            return new ResponseEntity<>(this.quizService.getByActiveQuizzes(true), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.OK);
        }
    }

    //    get active quizzes of category
    @GetMapping("/category/active/{catId}")
    public ResponseEntity<Set<QuizDTO>> getActiveQuizzesOfCategory(@PathVariable("catId") Long catId) {
        try {
            return new ResponseEntity<>(this.quizService.getByCategoryAndActiveQuizzes(catId, true), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.emptySet(), HttpStatus.OK);
        }
    }

    //    get active quizzes of category
    @GetMapping("/disabled")
    public ResponseEntity<List<QuizDTO>> getDisabledQuizzes() {
        try {
            List<QuizDTO> quizzes = this.quizService.getByActiveQuizzes(false);
            Collections.shuffle(quizzes);
            if (quizzes.size() == 0 || quizzes.size() <= 3) {
                return new ResponseEntity<>(quizzes, HttpStatus.OK);
            }
            return ResponseEntity.ok(quizzes.subList(1, 4));
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.OK);
        }
    }


    // for seraching
    @GetMapping("/search/{query}")
    public ResponseEntity<Set<QuizDTO>> getSearchedQuizzes(@PathVariable("query") String query) {
        try {
            return new ResponseEntity<>(this.quizService.getSearchedQuizzes(query), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.emptySet(), HttpStatus.OK);
        }
    }

    //for pagination purposes only
    @GetMapping("/active/{pageId}")
    public ResponseEntity<List> getActiveQuizzesPages(@PathVariable("pageId") Integer pageId) {
        try {
            PageRequest pageable = PageRequest.of(pageId - 1, 6);
            PageResponse<List<QuizDTO>> quizzes = this.quizService.getByActiveQuizzes(true, pageable);
            return new ResponseEntity<>(List.of(quizzes.getData(), pageId, quizzes.getTotalPage()), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(List.of(Collections.emptyList(), pageId, 0), HttpStatus.OK);
        }
    }

    //for total page size purposes only
    @GetMapping("/size/totalPage/all")
    public ResponseEntity<Integer> getActiveQuizzesPagesSize() {

        try {
            PageRequest pageable = PageRequest.of(0, 6);
            PageResponse<List<QuizDTO>> quizzes = this.quizService.getByActiveQuizzes(true, pageable);
            return new ResponseEntity<>(quizzes.getTotalPage(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(0, HttpStatus.OK);
        }
    }
}
