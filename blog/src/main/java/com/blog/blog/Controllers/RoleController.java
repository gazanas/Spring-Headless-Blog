package com.blog.blog.Controllers;

import com.blog.blog.Models.Role;
import com.blog.blog.Services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RoleController {

    @Autowired
    RoleService roleService;

    @RequestMapping(value = "/role/add", method = RequestMethod.POST)
    public void addRole(@RequestBody Role role) {
        roleService.addRole(role);
    }
}
