package com.blog.blog.Services;

import com.blog.blog.Models.Post;
import com.blog.blog.Repositories.PostsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    @Autowired
    PostsRepository postsRepository;

    public List<Post> getAllPosts(String direction, String field, Integer page, Integer size) {
        direction = (direction == null) ? "asc" : direction;
        field = (field == null) ? "id" : field;
        page = (page == null) ? 0 : page;
        size = (size == null) ? Integer.MAX_VALUE : size;

        return postsRepository.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.valueOf(direction.toUpperCase()), field))).toList();
    }

    public Post getPostByTitle(String title) {
        return postsRepository.findByTitle(title);
    }

    public List<Post> searchPostsByTitle(String title, String direction, String field, Integer page, Integer size) {
        direction = (direction == null) ? "asc" : direction;
        field = (field == null) ? "id" : field;
        page = (page == null) ? 0 : page;
        size = (size == null) ? Integer.MAX_VALUE : size;

        return postsRepository.searchByTitle(title, PageRequest.of(page, size, Sort.by(Sort.Direction.valueOf(direction.toUpperCase()), field)));
    }

    public List<Post> getPostsByCategory(String category, String direction, String field, Integer page, Integer size) {
        direction = (direction == null) ? "asc" : direction;
        field = (field == null) ? "id" : field;
        page = (page == null) ? 0 : page;
        size = (size == null) ? Integer.MAX_VALUE : size;

        return postsRepository.findByCategory(category, PageRequest.of(page, size, Sort.by(Sort.Direction.valueOf(direction.toUpperCase()), field)));
    }

    public void addPost(Post post) {
        postsRepository.save(post);
    }
}
