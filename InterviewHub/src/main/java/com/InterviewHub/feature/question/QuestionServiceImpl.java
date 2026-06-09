package com.InterviewHub.feature.question;

import com.InterviewHub.dto.PaginationDTO;
import com.InterviewHub.exception.ResourceNotFoundException;
import com.InterviewHub.feature.category.Category;
import com.InterviewHub.feature.category.CategoryRepository;
import com.InterviewHub.feature.question.dto.CreateQuestionRequest;
import com.InterviewHub.feature.question.dto.QuestionResponse;
import com.InterviewHub.feature.question.dto.UpdateQuestionRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;
    private final CategoryRepository categoryRepository;

    public QuestionServiceImpl(QuestionRepository questionRepository, CategoryRepository categoryRepository) {
        this.questionRepository = questionRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public PaginationDTO<QuestionResponse> searchQuestions(String title, DifficultyLevel difficulty, Long categoryId,
            int page, int size) {
        Specification<Question> spec = Specification.where(QuestionSpecification.hasTitle(title))
                .and(QuestionSpecification.hasDifficulty(difficulty))
                .and(QuestionSpecification.hasCategoryId(categoryId));

        Page<Question> questionPage = questionRepository.findAll(spec, PageRequest.of(page, size));
        return PaginationDTO.fromPage(questionPage.map(QuestionResponse::fromEntity));
    }

    @Override
    public QuestionResponse getQuestionById(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question", "id", id));
        return QuestionResponse.fromEntity(question);
    }

    @Override
    @Transactional
    public QuestionResponse createQuestion(CreateQuestionRequest request) {
        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", request.categoryId()));

        Question question = new Question();
        question.setTitle(request.title());
        question.setContent(request.content());
        question.setAnswerMarkdown(request.answerMarkdown());
        question.setDifficulty(request.difficulty());
        question.setCategory(category);

        return QuestionResponse.fromEntity(questionRepository.save(question));
    }

    @Override
    @Transactional
    public QuestionResponse updateQuestion(Long id, UpdateQuestionRequest request) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question", "id", id));

        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", request.categoryId()));

        question.setTitle(request.title());
        question.setContent(request.content());
        question.setAnswerMarkdown(request.answerMarkdown());
        question.setDifficulty(request.difficulty());
        question.setCategory(category);

        return QuestionResponse.fromEntity(questionRepository.save(question));
    }

    @Override
    @Transactional
    public void deleteQuestion(Long id) {
        if (!questionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Question", "id", id);
        }
        questionRepository.deleteById(id);
    }
}
