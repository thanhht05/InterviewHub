package com.InterviewHub.feature.user.dto;

import com.InterviewHub.feature.role.dto.RoleResponse;
import com.InterviewHub.feature.user.User;

import java.time.Instant;

public record UserResponse(
        Long id,
        String username,
        String email,
        String name,
        RoleResponse role,
        boolean isActive,
        Instant createdAt,
        Instant updatedAt
) {
    public static UserResponse fromEntity(User user) {
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getName(),
                RoleResponse.fromEntity(user.getRole()),
                user.isActive(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }
}
