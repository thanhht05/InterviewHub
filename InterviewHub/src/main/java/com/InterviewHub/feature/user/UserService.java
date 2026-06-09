package com.InterviewHub.feature.user;

import com.InterviewHub.dto.PaginationDTO;
import com.InterviewHub.feature.user.dto.CreateUserRequest;
import com.InterviewHub.feature.user.dto.UpdateUserRequest;
import com.InterviewHub.feature.user.dto.UserResponse;

public interface UserService {
    UserResponse createUser(CreateUserRequest request);
    UserResponse getUserById(Long id);
    PaginationDTO<UserResponse> getAllUsers(int page, int size);
    UserResponse updateUser(Long id, UpdateUserRequest request);
    void deleteUser(Long id);
}
