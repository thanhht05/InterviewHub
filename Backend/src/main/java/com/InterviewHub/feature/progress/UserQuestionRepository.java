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

    @org.springframework.data.jpa.repository.Query("SELECT uq.question FROM UserQuestion uq WHERE uq.user.id = :userId AND uq.question.category.id = :categoryId AND uq.status = :status")
    Page<com.InterviewHub.feature.question.Question> findQuestionsByUserIdAndCategoryIdAndStatus(
            @org.springframework.data.repository.query.Param("userId") Long userId,
            @org.springframework.data.repository.query.Param("categoryId") Long categoryId,
            @org.springframework.data.repository.query.Param("status") QuestionStatus status,
            Pageable pageable);
}
