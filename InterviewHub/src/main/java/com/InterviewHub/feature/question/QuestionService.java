package com.InterviewHub.feature.question;

import com.InterviewHub.dto.PaginationDTO;
import com.InterviewHub.feature.question.dto.CreateQuestionRequest;
import com.InterviewHub.feature.question.dto.QuestionResponse;
import com.InterviewHub.feature.question.dto.UpdateQuestionRequest;

public interface QuestionService {
    PaginationDTO<QuestionResponse> searchQuestions(String title, DifficultyLevel difficulty, Long categoryId, int page, int size);
    QuestionResponse getQuestionById(Long id);
    QuestionResponse createQuestion(CreateQuestionRequest request);
    QuestionResponse updateQuestion(Long id, UpdateQuestionRequest request);
    void deleteQuestion(Long id);
}
