package com.InterviewHub.feature.auth;

import com.InterviewHub.dto.AuthRequest;
import com.InterviewHub.dto.AuthResponse;
import com.InterviewHub.dto.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(AuthRequest request);
    com.InterviewHub.feature.user.dto.UserResponse getAccount();
}
