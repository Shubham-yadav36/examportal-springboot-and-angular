package com.exam.services;

import java.util.Set;

import com.exam.dto.CategoryDTO;
import com.exam.model.exam.Category;

public interface CategoryService {
    public CategoryDTO addCategory(CategoryDTO categoryDTO);

    public CategoryDTO getCategory(Long categoryId);

    public CategoryDTO updateCategory(CategoryDTO categoryDTO);

    public Set<CategoryDTO> getCategories();

    public void deleteCategory(Long categoryId);
}
