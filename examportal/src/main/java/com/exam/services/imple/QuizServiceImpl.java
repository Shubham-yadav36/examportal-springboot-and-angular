package com.exam.services.imple;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.exam.dto.PageResponse;
import com.exam.dto.QuizDTO;
import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;
import com.exam.repository.QuizRepository;
import com.exam.services.QuizService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private ModelMapper mapper;


    @Override
    public QuizDTO addQuiz(QuizDTO quizDTO) {
        Quiz quiz = this.quizRepository.save(mapper.map(quizDTO, Quiz.class));
        return mapper.map(quiz, QuizDTO.class);
    }

    @Override
    public QuizDTO getQuiz(Long quizId) {
        Quiz quiz = this.quizRepository.findById(quizId).get();
        return mapper.map(quiz, QuizDTO.class);
    }

    @Override
    public QuizDTO updateQuiz(QuizDTO quizDTO) {
        Quiz quiz = mapper.map(quizDTO, Quiz.class);
        quiz = this.quizRepository.save(quiz);
        return mapper.map(quiz, QuizDTO.class);
    }

    @Override
    public PageResponse<Set<QuizDTO>> getQuizzes(Pageable pageable) {
          Page<Quiz> page = this.quizRepository.findAll(pageable);
         Set<QuizDTO> quizDTOS=	page.getContent().stream().map((quiz -> mapper.map(quiz, QuizDTO.class))).collect(Collectors.toSet());
        PageResponse<Set<QuizDTO>> result = new PageResponse<>();
        result.setCurrentPage(page.getNumber());
        result.setTotalPage(page.getTotalPages());
        result.setData(quizDTOS);
         return result;
    }

    @Override
    public void deleteQuiz(Long quizId) {
        this.quizRepository.deleteById(quizId);
    }

    @Override
    public Set<QuizDTO> getQuizOfCategory(Long catId) {
        Category category = new Category();
        category.setcId(catId);
        Set<QuizDTO> quizDTOS = this.quizRepository.findBycategory(category).stream().map((quiz -> mapper.map(quiz, QuizDTO.class))).collect(Collectors.toSet());
        return quizDTOS;
    }

    @Override
    public List<QuizDTO> getByActiveQuizzes(Boolean status) {
        List<QuizDTO> quizDTOS = this.quizRepository.findByActive(status).stream().map((quiz -> mapper.map(quiz, QuizDTO.class))).collect(Collectors.toList());
        return quizDTOS;
    }

    @Override
    public PageResponse<List<QuizDTO>> getByActiveQuizzes(Boolean status, Pageable pageable) {
        Page<Quiz> page = this.quizRepository.findByActive(status, pageable);
        List<QuizDTO> quizDTOS = page.getContent().stream().map((quiz -> mapper.map(quiz, QuizDTO.class))).collect(Collectors.toList());
        return new PageResponse<>(quizDTOS, page.getTotalPages());
    }

    @Override
    public Set<QuizDTO> getByCategoryAndActiveQuizzes(Long catId, Boolean status) {
        Category category = new Category();
        category.setcId(catId);
        Set<QuizDTO> quizDTOS = this.quizRepository.findByCategoryAndActive(category, status).stream().map((quiz -> mapper.map(quiz, QuizDTO.class))).collect(Collectors.toSet());
        return quizDTOS;
    }

    @Override
    public Set<QuizDTO> getSearchedQuizzes(String query) {
        Set<QuizDTO> quizDTOS = this.quizRepository.findByTitleContaining(query).stream().map((quiz -> mapper.map(quiz, QuizDTO.class))).collect(Collectors.toSet());
        return quizDTOS;
    }

}
