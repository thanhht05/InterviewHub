package com.InterviewHub.feature.category;

import com.InterviewHub.dto.PaginationDTO;
import com.InterviewHub.feature.category.dto.CategoryResponse;
import com.InterviewHub.feature.category.dto.CreateCategoryRequest;
import com.InterviewHub.feature.category.dto.UpdateCategoryRequest;

public interface CategoryService {
    PaginationDTO<CategoryResponse> getAllCategories(int page, int size);
    CategoryResponse getCategoryById(Long id);
    CategoryResponse createCategory(CreateCategoryRequest request);
    CategoryResponse updateCategory(Long id, UpdateCategoryRequest request);
    void deleteCategory(Long id);
}
