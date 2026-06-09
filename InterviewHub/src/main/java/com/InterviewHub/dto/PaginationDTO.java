package com.InterviewHub.dto;

import org.springframework.data.domain.Page;

import java.util.List;

public record PaginationDTO<T>(
        int pageNumber,
        int pageSize,
        long totalElements,
        int totalPages,
        List<T> data
) {
    public static <T> PaginationDTO<T> fromPage(Page<T> page) {
        return new PaginationDTO<>(
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.getContent()
        );
    }
}
