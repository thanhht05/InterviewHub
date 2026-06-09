package com.InterviewHub.feature.question;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

public class QuestionSpecification {

    public static Specification<Question> hasTitle(String title) {
        return (root, query, criteriaBuilder) -> {
            if (!StringUtils.hasText(title)) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), "%" + title.toLowerCase() + "%");
        };
    }

    public static Specification<Question> hasDifficulty(DifficultyLevel difficulty) {
        return (root, query, criteriaBuilder) -> {
            if (difficulty == null) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("difficulty"), difficulty);
        };
    }

    public static Specification<Question> hasCategoryId(Long categoryId) {
        return (root, query, criteriaBuilder) -> {
            if (categoryId == null) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("category").get("id"), categoryId);
        };
    }
}
