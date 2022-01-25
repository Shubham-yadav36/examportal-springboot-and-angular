package com.exam.dto;

import java.io.Serializable;

public class ResultDTO implements Serializable {
    private Long rId;
    private Integer correctAnswer;
    private Integer attempted;
    private Double marksGot;
    private String attemptDate;

    private UserDTO user;

    private QuizDTO quiz;

    public Long getrId() {
        return rId;
    }

    public void setrId(Long rId) {
        this.rId = rId;
    }

    public Integer getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(Integer correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public Integer getAttempted() {
        return attempted;
    }

    public void setAttempted(Integer attempted) {
        this.attempted = attempted;
    }

    public Double getMarksGot() {
        return marksGot;
    }

    public void setMarksGot(Double marksGot) {
        this.marksGot = marksGot;
    }

    public String getAttemptDate() {
        return attemptDate;
    }

    public void setAttemptDate(String attemptDate) {
        this.attemptDate = attemptDate;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public QuizDTO getQuiz() {
        return quiz;
    }

    public void setQuiz(QuizDTO quiz) {
        this.quiz = quiz;
    }

}
