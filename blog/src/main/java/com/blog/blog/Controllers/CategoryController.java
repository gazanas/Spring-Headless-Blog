package com.blog.blog.Controllers;

import com.blog.blog.Models.Category;
import com.blog.blog.Repositories.CategoriesRepository;
import com.blog.blog.Services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @RequestMapping(value = "/category/all", method = RequestMethod.GET)
    public List<Category> getAllCategories(@RequestParam(required = false) String direction, @RequestParam(required = false) String field, @RequestParam(required = false) Integer page, @RequestParam(required = false) Integer size) {
        return categoryService.getAllCategories(direction, field, page, size);
    }

    @RequestMapping(value = "/category/{name}", method = RequestMethod.GET)
    public Category getCategory(@PathVariable String name) {
        return categoryService.getCategoryByName(name);
    }

    @RequestMapping(value = "/category/add", method = RequestMethod.POST)
    public void addCategory(@Valid @RequestBody Category category) {
        categoryService.addCategory(category);
    }
}
