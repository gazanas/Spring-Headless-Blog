package com.blog.blog.Repositories;

import com.blog.blog.Models.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostsRepository extends JpaRepository<Post, Integer> {

    Post findByTitle(@Param("title") String title);

    @Query("SELECT p FROM Post p INNER JOIN p.category c WHERE c.category = :category")
    List<Post> findByCategory(@Param(value = "category") String category, Pageable pageable);

    @Query("SELECT p FROM Post p WHERE title LIKE %:title%")
    List<Post> searchByTitle(@Param(value = "title") String title, Pageable pageable);
}
