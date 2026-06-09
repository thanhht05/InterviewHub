package com.InterviewHub.feature.progress;

import com.InterviewHub.feature.question.Question;
import com.InterviewHub.feature.user.User;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@Table(name = "user_question")
public class UserQuestion {

    @EmbeddedId
    private UserQuestionId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("questionId")
    @JoinColumn(name = "question_id")
    private Question question;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private QuestionStatus status;

    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;

    public UserQuestion() {}

    public UserQuestion(User user, Question question, QuestionStatus status) {
        this.id = new UserQuestionId(user.getId(), question.getId());
        this.user = user;
        this.question = question;
        this.status = status;
    }

    public UserQuestionId getId() {
        return id;
    }

    public void setId(UserQuestionId id) {
        this.id = id;
    }

    public User user() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public QuestionStatus getStatus() {
        return status;
    }

    public void setStatus(QuestionStatus status) {
        this.status = status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }
}
