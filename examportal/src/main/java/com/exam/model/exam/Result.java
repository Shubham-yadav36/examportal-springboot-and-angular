package com.exam.model.exam;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.exam.model.User;

@Entity
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long rId;
    private Integer correctAnswer;
    private Integer attempted;
    private Double marksGot;
    private String attemptDate;

    @ManyToOne(cascade = CascadeType.ALL)
    private User user = new User();

    @ManyToOne(cascade = CascadeType.ALL)
    private Quiz quiz = new Quiz();

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



    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }

    @Override
    public String toString() {
        return "Result [attemptDate=" + attemptDate + ", attempted=" + attempted + ", correctAnswer=" + correctAnswer
                + ", marksGot=" + marksGot + ",quiz=" + quiz + ", rId=" + rId
                + ", user=" + user + "]";
    }
}
