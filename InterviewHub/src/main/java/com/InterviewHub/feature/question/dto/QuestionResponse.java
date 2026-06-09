package com.InterviewHub.feature.question.dto;

import com.InterviewHub.feature.category.dto.CategoryResponse;
import com.InterviewHub.feature.question.DifficultyLevel;
import com.InterviewHub.feature.question.Question;

import java.time.Instant;

public record QuestionResponse(
        Long id,
        String title,
        String content,
        String answerMarkdown,
        DifficultyLevel difficulty,
        CategoryResponse category,
        Instant createdAt,
        Instant updatedAt
) {
    public static QuestionResponse fromEntity(Question question) {
        return new QuestionResponse(
                question.getId(),
                question.getTitle(),
                question.getContent(),
                question.getAnswerMarkdown(),
                question.getDifficulty(),
                CategoryResponse.fromEntity(question.getCategory()),
                question.getCreatedAt(),
                question.getUpdatedAt()
        );
    }
}
