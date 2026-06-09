package com.InterviewHub.feature.progress;

import com.InterviewHub.dto.PaginationDTO;
import com.InterviewHub.feature.progress.dto.UpdateProgressRequest;
import com.InterviewHub.feature.progress.dto.UserProgressResponse;

public interface ProgressService {
    UserProgressResponse markQuestionStatus(UpdateProgressRequest request);
    PaginationDTO<UserProgressResponse> getUserProgress(int page, int size);
}
