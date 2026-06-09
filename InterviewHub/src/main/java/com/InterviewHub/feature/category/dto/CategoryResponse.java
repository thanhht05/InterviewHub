package com.InterviewHub.feature.category.dto;

import com.InterviewHub.feature.category.Category;

public record CategoryResponse(
        Long id,
        String name,
        String description
) {
    public static CategoryResponse fromEntity(Category category) {
        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getDescription()
        );
    }
}
