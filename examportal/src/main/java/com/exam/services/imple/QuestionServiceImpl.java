package com.exam.services.imple;

import java.util.*;
import java.util.stream.Collectors;

import com.exam.dto.QuestionDTO;
import com.exam.dto.QuizDTO;
import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.repository.QuestionRepository;
import com.exam.repository.QuizRepository;
import com.exam.services.QuestionService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private ModelMapper mapper;

    @Override
    public QuestionDTO addQuestion(QuestionDTO questionDTO) {
        Question question = mapper.map(questionDTO, Question.class);
        Question result = this.questionRepository.save(question);
        return mapper.map(result,QuestionDTO.class);
    }

    @Override
    public QuestionDTO getQuestion(Long questionId) {
        Question question = this.questionRepository.findById(questionId).get();
        return mapper.map(question, QuestionDTO.class);
    }

    @Override
    public QuestionDTO updateQuestion(QuestionDTO questionDTO) {
        Question question = mapper.map(questionDTO, Question.class);
        Question result = this.questionRepository.save(question);
        return mapper.map(result, QuestionDTO.class);
    }

    @Override
    public Set<QuestionDTO> getQuestions() {
        Set<QuestionDTO> questions = this.questionRepository.findAll().stream().map((question -> mapper.map(question, QuestionDTO.class))).collect(Collectors.toSet());
        return questions;
    }

    @Override
    public void deleteQuestion(Long questionId) {
        Question question = new Question();
        question.setqId(questionId);
        this.questionRepository.delete(question);
    }

    @Override
    public Set<QuestionDTO> getQuestionsOfQuiz(Long quizId) {
        Quiz quiz = new Quiz();
        quiz.setqId(quizId);
        Set<QuestionDTO> questions = this.questionRepository.findByQuiz(quiz).stream().map((question -> mapper.map(question, QuestionDTO.class))).collect(Collectors.toSet());
        return questions;
    }

    @Override
    public QuestionDTO getQuestionById(Long questionId) {
        Question question = this.questionRepository.findById(questionId).get();
        return mapper.map(question, QuestionDTO.class);
    }

    @Override
    public List<QuestionDTO> getQuestionsOfQuizForUser(Long quizId) {
        Quiz quiz = this.quizRepository.findById(quizId).get();
        Set<QuestionDTO> questions = quiz.getQuestions().stream().map(question -> mapper.map(question, QuestionDTO.class)).collect(Collectors.toSet());
        List<QuestionDTO> list = new ArrayList<>(questions);
        if (list.size() > Integer.parseInt(quiz.getNumberOfQuestions())) {
            list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions() + 1));
        }
        list.forEach(q -> {
            q.setAnswer("");
        });
        Collections.shuffle(list);
        return list;
    }

    @Override
    public Map<String, Object> generateResult(List<QuestionDTO> questionDTOS) {
        double marksGot = 0;
        int correctAnswer = 0;
        int attempted = 0;
        for (QuestionDTO q : questionDTOS) {
            Question question = this.questionRepository.getOne(q.getqId());
            if (question.getAnswer().trim().equals(q.getGivenAnswer())) {
//				correct
                correctAnswer++;
                double perQuesMarks = Double.parseDouble(questionDTOS.get(0).getQuiz().getMaxMarks()) / Double.parseDouble(questionDTOS.get(0).getQuiz().getNumberOfQuestions());
                marksGot += perQuesMarks;
            }
            if (q.getGivenAnswer() != null) {
                attempted++;
            }
        }

        Map<String, Object> result = Map.of(
                "marksGot", marksGot,
                "correctAnswer", correctAnswer,
                "attempted", attempted
        );
        return result;
    }

}
