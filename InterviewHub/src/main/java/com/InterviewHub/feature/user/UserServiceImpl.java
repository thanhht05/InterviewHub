package com.InterviewHub.feature.user;

import com.InterviewHub.dto.PaginationDTO;
import com.InterviewHub.exception.InvalidRequestException;
import com.InterviewHub.exception.ResourceNotFoundException;
import com.InterviewHub.feature.role.Role;
import com.InterviewHub.feature.role.RoleRepository;
import com.InterviewHub.feature.user.dto.CreateUserRequest;
import com.InterviewHub.feature.user.dto.UpdateUserRequest;
import com.InterviewHub.feature.user.dto.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public UserResponse createUser(CreateUserRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new InvalidRequestException("Email already exists");
        }
        if (userRepository.existsByUsername(request.username())) {
            throw new InvalidRequestException("Username already exists");
        }

        Role role = roleRepository.findById(request.roleId())
                .orElseThrow(() -> new ResourceNotFoundException("Role", "id", request.roleId()));

        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setName(request.name());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(role);
        user.setActive(true);

        User savedUser = userRepository.save(user);
        return UserResponse.fromEntity(savedUser);
    }

    @Override
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        return UserResponse.fromEntity(user);
    }

    @Override
    public PaginationDTO<UserResponse> getAllUsers(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<User> userPage = userRepository.findAll(pageRequest);
        Page<UserResponse> dtoPage = userPage.map(UserResponse::fromEntity);
        return PaginationDTO.fromPage(dtoPage);
    }

    @Override
    @Transactional
    public UserResponse updateUser(Long id, UpdateUserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        if (!user.getEmail().equals(request.email()) && userRepository.existsByEmail(request.email())) {
            throw new InvalidRequestException("Email already exists");
        }
        if (!user.getUsername().equals(request.username()) && userRepository.existsByUsername(request.username())) {
            throw new InvalidRequestException("Username already exists");
        }

        Role role = roleRepository.findById(request.roleId())
                .orElseThrow(() -> new ResourceNotFoundException("Role", "id", request.roleId()));

        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setName(request.name());
        user.setRole(role);
        user.setActive(request.isActive());

        if (request.password() != null && !request.password().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.password()));
        }

        User updatedUser = userRepository.save(user);
        return UserResponse.fromEntity(updatedUser);
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User", "id", id);
        }
        userRepository.deleteById(id);
    }
}
