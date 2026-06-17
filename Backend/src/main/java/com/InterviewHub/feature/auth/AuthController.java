package com.InterviewHub.feature.auth;

import com.InterviewHub.dto.ApiResponse;
import com.InterviewHub.dto.AuthRequest;
import com.InterviewHub.dto.AuthResponse;
import com.InterviewHub.dto.RegisterRequest;
import com.InterviewHub.feature.user.dto.UserResponse;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(
            @RequestBody RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created(authService.register(request)));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @RequestBody AuthRequest request, HttpServletResponse response)

    {
        AuthResponse res = authService.login(request);
        String refreshToken = res.getRefreshToken();
        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setSecure(true);
        cookie.setMaxAge(7 * 24 * 60 * 60);
        response.addCookie(cookie);
        return ResponseEntity.ok(ApiResponse.success(res));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<ApiResponse<AuthResponse>> refreshToken(
            @CookieValue(name = "refreshToken", required = false) String refreshToken,
            HttpServletResponse response) {
        if (refreshToken == null) {
            throw new RuntimeException("Refresh token is missing");
        }
        AuthResponse res = authService.refreshToken(refreshToken);
        
        Cookie cookie = new Cookie("refreshToken", res.getRefreshToken());
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setSecure(true);
        cookie.setMaxAge(7 * 24 * 60 * 60);
        response.addCookie(cookie);
        
        return ResponseEntity.ok(ApiResponse.success(res));
    }

    @GetMapping("/account")
    public ResponseEntity<ApiResponse<UserResponse>> getAccount() {
        return ResponseEntity.ok(ApiResponse.success(authService.getAccount()));
    }
}
