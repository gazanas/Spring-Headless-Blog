package com.blog.blog.Services;

import com.blog.blog.Models.Category;
import com.blog.blog.Repositories.CategoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    CategoriesRepository categoriesRepository;

    public List<Category> getAllCategories(String direction, String field, Integer page, Integer size) {
        direction = (direction == null) ? "asc" : direction;
        field = (field == null) ? "id" : field;
        page = (page == null) ? 0 : page;
        size = (size == null) ? Integer.MAX_VALUE : size;
        return categoriesRepository.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.valueOf(direction.toUpperCase()), field))).toList();
    }

    public Category getCategoryByName(String category) {
        return categoriesRepository.findByCategory(category);
    }

    public void addCategory(Category category) {
        categoriesRepository.save(category);
    }
}
