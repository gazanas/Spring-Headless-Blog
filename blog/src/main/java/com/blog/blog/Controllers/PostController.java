package com.blog.blog.Controllers;

import com.blog.blog.Models.Post;
import com.blog.blog.Services.FilesystemStorageService;
import com.blog.blog.Services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class PostController {

    @Autowired
    PostService postService;

    @RequestMapping(value = "/post/all", method = RequestMethod.GET)
    public List<Post> getAllPosts(@RequestParam(required = false) String direction, @RequestParam(required = false) String field, @RequestParam(required = false) Integer page, @RequestParam(required = false) Integer size) {
        return postService.getAllPosts(direction, field, page, size);
    }

    @RequestMapping(value = "/post/{category}", method = RequestMethod.GET)
    public List<Post> getPostsByCategory(@PathVariable String category, @RequestParam(required = false) String direction, @RequestParam(required = false) String field, @RequestParam(required = false) Integer page, @RequestParam(required = false) Integer size) {
        return postService.getPostsByCategory(category, direction, field, page, size);
    }

    @RequestMapping(value = "/post/find", method = RequestMethod.GET)
    public Post getPostByTitle(@RequestParam String title) {
        return postService.getPostByTitle(title);
    }

    @RequestMapping(value = "/post/search", method = RequestMethod.GET)
    public List<Post> searchPostsByTitle(@RequestParam String title, @RequestParam(required = false) String direction, @RequestParam(required = false) String field, @RequestParam(required = false) Integer page, @RequestParam(required = false) Integer size) {
        return postService.searchPostsByTitle(title, direction, field, page, size);
    }

    @RequestMapping(value = "/post/image", method = RequestMethod.POST)
    public String uploadPostImage(@RequestBody MultipartFile image) {
        return (new FilesystemStorageService("/uploads/static/images/articles")).store(image);
    }

    @RequestMapping(value = "/post/add", method = RequestMethod.POST)
    public void addPost(@ModelAttribute Post post) {
        String image = this.uploadPostImage(post.getImageFile());
        post.setImage(image);
        postService.addPost(post);
    }
}
