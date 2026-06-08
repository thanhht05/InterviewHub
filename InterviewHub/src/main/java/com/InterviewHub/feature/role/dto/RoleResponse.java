package com.InterviewHub.feature.role.dto;

import com.InterviewHub.feature.role.Role;

public record RoleResponse(
        Long id,
        String name
) {
    public static RoleResponse fromEntity(Role role) {
        return new RoleResponse(
                role.getId(),
                role.getName()
        );
    }
}
