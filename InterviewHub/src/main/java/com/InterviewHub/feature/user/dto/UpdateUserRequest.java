package com.InterviewHub.feature.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UpdateUserRequest(
        @NotBlank(message = "Username is required")
        @Size(max = 50, message = "Username cannot exceed 50 characters")
        String username,

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        @Size(max = 100, message = "Email cannot exceed 100 characters")
        String email,

        @Size(min = 8, max = 100, message = "Password must be 8-100 characters if provided")
        String password, // Optional on update

        @NotBlank(message = "Name is required")
        @Size(max = 100, message = "Name cannot exceed 100 characters")
        String name,

        @NotNull(message = "Role ID is required")
        Long roleId,

        @NotNull(message = "Active status is required")
        Boolean isActive
) {}
