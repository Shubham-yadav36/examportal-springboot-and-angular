package com.exam.services.imple;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.exam.dto.QuizDTO;
import com.exam.dto.ResultDTO;
import com.exam.dto.UserDTO;
import com.exam.model.User;
import com.exam.model.exam.Quiz;
import com.exam.model.exam.Result;
import com.exam.repository.QuizRepository;
import com.exam.repository.ResultRepository;
import com.exam.repository.UserRepository;
import com.exam.services.ResultService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ResultServiceImpl implements ResultService {

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper mapper;

    @Override
    public ResultDTO addResult(ResultDTO resultDTO) {
        resultDTO.setAttemptDate(new Date().toString());
        Quiz quiz = this.quizRepository.findById(resultDTO.getQuiz().getqId()).get();
        User user = this.userRepository.findById(resultDTO.getUser().getId()).get();
        Result resultD = getResultByUserAndQuiz(user, quiz);
        if (resultD != null) {
            resultDTO.setrId(resultD.getrId());
            resultD.setUser(resultD.getUser());
            resultD.setQuiz(resultD.getQuiz());
            return updateResult(resultDTO);
        }
        resultDTO.setUser(mapper.map(user, UserDTO.class));
        resultDTO.setQuiz(mapper.map(quiz, QuizDTO.class));
        Result forSave = mapper.map(resultDTO, Result.class);
        Result saved = this.resultRepository.save(forSave);
        return mapper.map(saved, ResultDTO.class);
    }

    @Override
    public ResultDTO getResult(Long id) {
        Result result = this.resultRepository.findById(id).get();
        return mapper.map(result, ResultDTO.class);
    }

    @Override
    public ResultDTO updateResult(ResultDTO resultDTO) {
        Result result = mapper.map(resultDTO, Result.class);
        Result saved = this.resultRepository.save(result);
        return mapper.map(saved, ResultDTO.class);
    }

    @Override
    public void removeResult(Result result) {
        this.resultRepository.delete(result);
    }

    @Override
    public Result getResultByUserAndQuiz(User user, Quiz quiz) {
        return this.resultRepository.findByUserAndQuiz(user, quiz);
    }

    @Override
    public List<ResultDTO> getAllResultOfUserById(Long userId) {
        User user = new User();
        user.setId(userId);
        List<ResultDTO> resultDTOS = this.resultRepository.findByUser(user).stream().map(result -> mapper.map(result, ResultDTO.class)).collect(Collectors.toList());
        return resultDTOS;
    }

}
