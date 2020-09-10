package com.blog.blog.Services;

import com.blog.blog.Models.Post;
import com.blog.blog.Models.Role;
import com.blog.blog.Repositories.RolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Autowired
    RolesRepository rolesRepository;

    public void addRole(Role role) {
        rolesRepository.save(role);
    }
}
