package com.blog.blog.Controllers;

import com.blog.blog.Models.LoginModel;
import com.blog.blog.Models.User;
import com.blog.blog.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping(value = "/user/all", method = RequestMethod.GET)
    public List<User> getAllUsers(@RequestParam(required = false) String direction, @RequestParam(required = false) String field, @RequestParam(required = false) Integer page, @RequestParam(required = false) Integer size) {
        return userService.getAllUsers(direction, field, page, size);
    }

    @RequestMapping(value = "/user/{uid}", method = RequestMethod.GET)
    public User getUserById(@PathVariable Integer uid) {
        return userService.getUserById(uid);
    }

    @RequestMapping(value = "/user/add", method = RequestMethod.POST)
    public void addUser(@RequestBody User user) {
        userService.addUser(user);
    }

    @RequestMapping(value = "/user/principal", method = RequestMethod.GET)
    public User getPrincipal(Principal principal) {
        return userService.getUserByUsername(principal.getName());
    }
}
