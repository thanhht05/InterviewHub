package com.InterviewHub.feature.progress;

import com.InterviewHub.dto.PaginationDTO;
import com.InterviewHub.exception.ResourceNotFoundException;
import com.InterviewHub.feature.progress.dto.UpdateProgressRequest;
import com.InterviewHub.feature.progress.dto.UserProgressResponse;
import com.InterviewHub.feature.question.Question;
import com.InterviewHub.feature.question.QuestionRepository;
import com.InterviewHub.feature.user.User;
import com.InterviewHub.feature.user.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProgressServiceImpl implements ProgressService {

    private final UserQuestionRepository userQuestionRepository;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;

    public ProgressServiceImpl(UserQuestionRepository userQuestionRepository,
                               UserRepository userRepository,
                               QuestionRepository questionRepository) {
        this.userQuestionRepository = userQuestionRepository;
        this.userRepository = userRepository;
        this.questionRepository = questionRepository;
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            throw new RuntimeException("User not authenticated");
        }
        return userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    @Transactional
    public UserProgressResponse markQuestionStatus(UpdateProgressRequest request) {
        User user = getCurrentUser();

        Question question = questionRepository.findById(request.questionId())
                .orElseThrow(() -> new ResourceNotFoundException("Question", "id", request.questionId()));

        UserQuestion userQuestion = userQuestionRepository.findByUserIdAndQuestionId(user.getId(), question.getId())
                .orElse(new UserQuestion(user, question, request.status()));

        userQuestion.setStatus(request.status());
        return UserProgressResponse.fromEntity(userQuestionRepository.save(userQuestion));
    }

    @Override
    public PaginationDTO<UserProgressResponse> getUserProgress(int page, int size) {
        User user = getCurrentUser();
        Page<UserQuestion> progressPage = userQuestionRepository.findByUserId(user.getId(), PageRequest.of(page, size));
        return PaginationDTO.fromPage(progressPage.map(UserProgressResponse::fromEntity));
    }
}
