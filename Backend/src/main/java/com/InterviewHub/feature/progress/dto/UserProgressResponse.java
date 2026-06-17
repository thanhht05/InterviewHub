package com.InterviewHub.feature.progress.dto;

import com.InterviewHub.feature.progress.QuestionStatus;
import com.InterviewHub.feature.progress.UserQuestion;

import java.time.Instant;

public record UserProgressResponse(
        Long questionId,
        String questionTitle,
        QuestionStatus status,
        Instant updatedAt
) {
    public static UserProgressResponse fromEntity(UserQuestion userQuestion) {
        return new UserProgressResponse(
                userQuestion.getQuestion().getId(),
                userQuestion.getQuestion().getTitle(),
                userQuestion.getStatus(),
                userQuestion.getUpdatedAt()
        );
    }
}
