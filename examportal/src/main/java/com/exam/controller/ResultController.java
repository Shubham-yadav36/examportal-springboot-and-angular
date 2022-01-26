package com.exam.controller;

import java.security.Principal;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import com.exam.dto.QuizDTO;
import com.exam.dto.ResultDTO;
import com.exam.dto.UserDTO;
import com.exam.model.User;
import com.exam.model.exam.Quiz;
import com.exam.model.exam.Result;
import com.exam.services.QuizService;
import com.exam.services.ResultService;
import com.exam.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/result")
public class ResultController {
    @Autowired
    private ResultService resultService;

    @PostMapping("/{qId}")
    public ResponseEntity<?> saveResult(Principal principal, @RequestBody ResultDTO resultDTO, @PathVariable("qId") Long qId) {
        try {
            resultDTO.getUser().setUsername(principal.getName());
            resultDTO.getQuiz().setqId(qId);
            ResultDTO result = this.resultService.addResult(resultDTO);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{resultId}")
    public ResponseEntity<?> getResult(@PathVariable("resultId") Long resultId) {
        try {
            ResultDTO result = this.resultService.getResult(resultId);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // get all the attempted quiz of the particular user
    @GetMapping("/getresults/{userId}")
    public ResponseEntity<?> getAllResultOfUser(@PathVariable("userId") Long userId) {
        try {
            List<ResultDTO> results = this.resultService.getAllResultOfUserById(userId);
            return new ResponseEntity<>(results, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.OK);
        }
    }

}
