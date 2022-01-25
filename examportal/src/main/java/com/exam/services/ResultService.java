package com.exam.services;

import com.exam.dto.ResultDTO;
import com.exam.model.User;
import com.exam.model.exam.Quiz;
import com.exam.model.exam.Result;

import java.util.List;

public interface ResultService {
    public ResultDTO addResult(ResultDTO resultDTO);
    public ResultDTO getResult(Long id);
    public ResultDTO updateResult(ResultDTO resultDTO);
    public void removeResult(Result result);
    public Result getResultByUserAndQuiz(User user,Quiz quiz);
    public List<ResultDTO> getAllResultOfUserById(Long userId);
}
