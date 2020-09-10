package com.blog.blog.Repositories;

import com.blog.blog.Models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RolesRepository extends JpaRepository<Role, Integer> {

    Role findById(@Param("id") int id);
}
