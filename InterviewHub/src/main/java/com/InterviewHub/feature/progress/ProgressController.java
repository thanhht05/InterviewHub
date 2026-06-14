package com.InterviewHub.feature.progress;

import com.InterviewHub.dto.ApiResponse;
import com.InterviewHub.dto.PaginationDTO;
import com.InterviewHub.feature.progress.dto.UpdateProgressRequest;
import com.InterviewHub.feature.progress.dto.UserProgressResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/progress")
public class ProgressController {

    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UserProgressResponse>> markQuestionStatus(
            @RequestBody @Valid UpdateProgressRequest request) {
        return ResponseEntity.ok(ApiResponse.success(progressService.markQuestionStatus(request)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PaginationDTO<UserProgressResponse>>> getUserProgress(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(ApiResponse.success(progressService.getUserProgress(page, size)));
    }
    @GetMapping("/{questionId}")
    public ResponseEntity<ApiResponse<UserProgressResponse>> getQuestionProgress(@PathVariable Long questionId) {
        UserProgressResponse progress = progressService.getQuestionProgress(questionId);
        if (progress == null) {
            return ResponseEntity.ok(ApiResponse.success(null)); // Return null or a designated empty response if no progress exists
        }
        return ResponseEntity.ok(ApiResponse.success(progress));
    }

    @GetMapping("/category/{categoryId}/learned")
    public ResponseEntity<ApiResponse<PaginationDTO<com.InterviewHub.feature.question.dto.QuestionResponse>>> getLearnedQuestionsByCategory(
            @PathVariable Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(ApiResponse.success(progressService.getLearnedQuestionsByCategory(categoryId, page, size)));
    }
}
