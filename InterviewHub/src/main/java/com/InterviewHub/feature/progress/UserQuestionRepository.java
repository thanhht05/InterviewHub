package com.InterviewHub.feature.progress;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserQuestionRepository extends JpaRepository<UserQuestion, UserQuestionId> {
    Page<UserQuestion> findByUserId(Long userId, Pageable pageable);
    Optional<UserQuestion> findByUserIdAndQuestionId(Long userId, Long questionId);
}
