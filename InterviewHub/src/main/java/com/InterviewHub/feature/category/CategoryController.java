package com.InterviewHub.feature.category;

import com.InterviewHub.dto.ApiResponse;
import com.InterviewHub.dto.PaginationDTO;
import com.InterviewHub.feature.category.dto.CategoryResponse;
import com.InterviewHub.feature.category.dto.CreateCategoryRequest;
import com.InterviewHub.feature.category.dto.UpdateCategoryRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PaginationDTO<CategoryResponse>>> getAllCategories(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getAllCategories(page, size)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponse>> getCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getCategoryById(id)));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<ApiResponse<CategoryResponse>> createCategory(
            @RequestBody @Valid CreateCategoryRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created(categoryService.createCategory(request)));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponse>> updateCategory(
            @PathVariable Long id,
            @RequestBody @Valid UpdateCategoryRequest request) {
        return ResponseEntity.ok(ApiResponse.success(categoryService.updateCategory(id, request)));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
