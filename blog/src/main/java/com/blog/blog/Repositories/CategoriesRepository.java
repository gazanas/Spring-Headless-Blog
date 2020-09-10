package com.blog.blog.Repositories;

import com.blog.blog.Models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriesRepository extends JpaRepository<Category, Integer> {

    Category findByCategory(@Param("category") String category);
}
