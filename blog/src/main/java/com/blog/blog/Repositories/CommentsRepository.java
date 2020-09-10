package com.blog.blog.Repositories;

import com.blog.blog.Models.Comment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentsRepository extends JpaRepository<Comment, Integer> {

    @Query("SELECT c FROM Comment c INNER JOIN c.post p WHERE p.id = :post")
    List<Comment> findByPost(Integer post, Pageable pageable);
}
