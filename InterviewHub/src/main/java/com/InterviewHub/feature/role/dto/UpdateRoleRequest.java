package com.InterviewHub.feature.role.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateRoleRequest(
        @NotBlank(message = "Role name is required")
        @Size(max = 50, message = "Role name cannot exceed 50 characters")
        String name
) {}
