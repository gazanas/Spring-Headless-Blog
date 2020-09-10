package com.blog.blog.Services;

import com.blog.blog.Models.Comment;
import com.blog.blog.Repositories.CommentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CommentService {

    @Autowired
    CommentsRepository commentsRepository;

    public List<Comment> getAllComments(String direction, String field, Integer page, Integer size) {
        direction = (direction == null) ? "asc" : direction;
        field = (field == null) ? "id" : field;
        page = (page == null) ? 0 : page;
        size = (size == null) ? Integer.MAX_VALUE : size;

        return commentsRepository.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.valueOf(direction.toUpperCase()), field))).toList();
    }

    public List<Comment> getPostComments(Integer post, String direction, String field, Integer page, Integer size) {
        direction = (direction == null) ? "asc" : direction;
        field = (field == null) ? "id" : field;
        page = (page == null) ? 0 : page;
        size = (size == null) ? Integer.MAX_VALUE : size;

        return commentsRepository.findByPost(post, PageRequest.of(page, size, Sort.by(Sort.Direction.valueOf(direction.toUpperCase()), field)));
    }
}
