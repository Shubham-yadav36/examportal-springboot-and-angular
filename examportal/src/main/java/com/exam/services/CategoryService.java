package com.exam.services;

import java.util.Set;

import com.exam.dto.CategoryDTO;
import com.exam.dto.PageResponse;
import com.exam.model.exam.Category;
import org.springframework.data.domain.Pageable;

public interface CategoryService {
    public CategoryDTO addCategory(CategoryDTO categoryDTO);

    public CategoryDTO getCategory(Long categoryId);

    public CategoryDTO updateCategory(CategoryDTO categoryDTO);

    public Set<CategoryDTO> getCategories();

    public void deleteCategory(Long categoryId);

    PageResponse<Set<CategoryDTO>> findAllCategory(Pageable pageable);
}
