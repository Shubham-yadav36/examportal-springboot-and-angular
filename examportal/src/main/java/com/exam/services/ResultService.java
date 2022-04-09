package com.exam.services;

import com.exam.dto.PageResponse;
import com.exam.dto.ResultDTO;
import com.exam.model.User;
import com.exam.model.exam.Quiz;
import com.exam.model.exam.Result;

import java.util.List;

import org.springframework.data.domain.Pageable;

public interface ResultService {
    public ResultDTO addResult(ResultDTO resultDTO);
    public ResultDTO getResult(Long id);
    public ResultDTO updateResult(ResultDTO resultDTO);
    public void removeResult(Result result);
    public Result getResultByUserAndQuiz(User user,Quiz quiz);
    public PageResponse<List<ResultDTO>> getAllResultOfUserById(Long userId, Pageable pageable);
}
