package com.InterviewHub.feature.category;

import com.InterviewHub.dto.PaginationDTO;
import com.InterviewHub.exception.InvalidRequestException;
import com.InterviewHub.exception.ResourceNotFoundException;
import com.InterviewHub.feature.category.dto.CategoryResponse;
import com.InterviewHub.feature.category.dto.CreateCategoryRequest;
import com.InterviewHub.feature.category.dto.UpdateCategoryRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public PaginationDTO<CategoryResponse> getAllCategories(int page, int size) {
        Page<Category> categoryPage = categoryRepository.findAll(PageRequest.of(page, size));
        return PaginationDTO.fromPage(categoryPage.map(CategoryResponse::fromEntity));
    }

    @Override
    public CategoryResponse getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));
        return CategoryResponse.fromEntity(category);
    }

    @Override
    @Transactional
    public CategoryResponse createCategory(CreateCategoryRequest request) {
        if (categoryRepository.existsByName(request.name())) {
            throw new InvalidRequestException("Category name already exists");
        }
        
        Category category = new Category();
        category.setName(request.name());
        category.setDescription(request.description());
        
        return CategoryResponse.fromEntity(categoryRepository.save(category));
    }

    @Override
    @Transactional
    public CategoryResponse updateCategory(Long id, UpdateCategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));

        if (!category.getName().equals(request.name()) && categoryRepository.existsByName(request.name())) {
            throw new InvalidRequestException("Category name already exists");
        }

        category.setName(request.name());
        category.setDescription(request.description());

        return CategoryResponse.fromEntity(categoryRepository.save(category));
    }

    @Override
    @Transactional
    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category", "id", id);
        }
        categoryRepository.deleteById(id);
    }
}
