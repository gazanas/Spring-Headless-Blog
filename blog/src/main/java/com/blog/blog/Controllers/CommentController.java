package com.blog.blog.Controllers;

import com.blog.blog.Models.Comment;
import com.blog.blog.Services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CommentController {

    @Autowired
    CommentService  commentService;

    @RequestMapping(value = "/comment/all", method = RequestMethod.GET)
    public List<Comment> getAllComments(@RequestParam(required = false) String direction, @RequestParam(required = false) String field, @RequestParam(required = false) Integer page, @RequestParam(required = false) Integer size) {
        return commentService.getAllComments(direction, field, page, size);
    }

    @RequestMapping(value = "/comment/post", method = RequestMethod.GET)
    public List<Comment> getPostComments(@RequestParam Integer post, @RequestParam(required = false) String direction, @RequestParam(required = false) String field, @RequestParam(required = false) Integer page, @RequestParam(required = false) Integer size) {
        return commentService.getPostComments(post, direction, field, page, size);
    }
}
