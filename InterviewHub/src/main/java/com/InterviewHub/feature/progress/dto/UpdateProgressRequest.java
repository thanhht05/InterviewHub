package com.InterviewHub.feature.progress.dto;

import com.InterviewHub.feature.progress.QuestionStatus;
import jakarta.validation.constraints.NotNull;

public record UpdateProgressRequest(@NotNull(message = "Question ID is required") Long questionId,

                @NotNull(message = "Status is required") QuestionStatus status) {
}
