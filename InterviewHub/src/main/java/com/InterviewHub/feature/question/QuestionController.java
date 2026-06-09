package com.InterviewHub.feature.question;

import com.InterviewHub.dto.ApiResponse;
import com.InterviewHub.dto.PaginationDTO;
import com.InterviewHub.feature.question.dto.CreateQuestionRequest;
import com.InterviewHub.feature.question.dto.QuestionResponse;
import com.InterviewHub.feature.question.dto.UpdateQuestionRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PaginationDTO<QuestionResponse>>> getAllQuestions(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) DifficultyLevel difficulty,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        PaginationDTO<QuestionResponse> response = questionService.searchQuestions(title, difficulty, categoryId, page,
                size);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<QuestionResponse>> getQuestionById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(questionService.getQuestionById(id)));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<ApiResponse<QuestionResponse>> createQuestion(
            @RequestBody @Valid CreateQuestionRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created(questionService.createQuestion(request)));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<QuestionResponse>> updateQuestion(
            @PathVariable Long id,
            @RequestBody @Valid UpdateQuestionRequest request) {
        return ResponseEntity.ok(ApiResponse.success(questionService.updateQuestion(id, request)));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
