package com.exam.services.imple;

import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;

import com.exam.dto.CategoryDTO;
import com.exam.dto.PageResponse;
import com.exam.model.exam.Category;
import com.exam.repository.CategoryRepository;
import com.exam.services.CategoryService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper mapper;

    @Override
    public CategoryDTO addCategory(CategoryDTO categoryDTO) {
        Category category = this.categoryRepository.save(mapper.map(categoryDTO, Category.class));
        return mapper.map(category, CategoryDTO.class);
    }

    @Override
    public CategoryDTO getCategory(Long categoryId) {
        Category category = this.categoryRepository.findById(categoryId).get();
        return mapper.map(category, CategoryDTO.class);
    }

    @Override
    public CategoryDTO updateCategory(CategoryDTO categoryDTO) {
        Category category = this.categoryRepository.save(mapper.map(categoryDTO, Category.class));
        return mapper.map(category, CategoryDTO.class);
    }

    @Override
    public Set<CategoryDTO> getCategories() {
        Set<CategoryDTO> categoryDTOS = this.categoryRepository.findAll().stream().map((category -> mapper.map(category, CategoryDTO.class))).collect(Collectors.toSet());
        return categoryDTOS;
    }

    @Override
    public void deleteCategory(Long categoryId) {
        this.categoryRepository.deleteById(categoryId);
    }

    @Override
    public PageResponse<Set<CategoryDTO>> findAllCategory(Pageable pageable) {
        Page<Category> categories = this.categoryRepository.findAll(pageable);
        Set<CategoryDTO> categoryDTOS = categories.getContent().stream().map((category -> mapper.map(category, CategoryDTO.class))).collect(Collectors.toSet());
        PageResponse<Set<CategoryDTO>> result = new PageResponse<>();
        result.setCurrentPage(categories.getNumber());
        result.setTotalPage(categories.getTotalPages());
        result.setData(categoryDTOS);
        return result;
    }

}
