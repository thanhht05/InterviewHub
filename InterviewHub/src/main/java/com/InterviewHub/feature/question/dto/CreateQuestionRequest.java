package com.InterviewHub.feature.question.dto;

import com.InterviewHub.feature.question.DifficultyLevel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateQuestionRequest(
        @NotBlank(message = "Title is required")
        @Size(max = 255, message = "Title must not exceed 255 characters")
        String title,

        @NotBlank(message = "Content is required")
        String content,

        @NotBlank(message = "Answer markdown is required")
        String answerMarkdown,

        @NotNull(message = "Difficulty level is required")
        DifficultyLevel difficulty,

        @NotNull(message = "Category ID is required")
        Long categoryId
) {
}
