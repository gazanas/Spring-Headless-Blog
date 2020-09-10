package com.blog.blog.Configuration;

import com.blog.blog.Models.User;
import com.blog.blog.Repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class BlogUserDetailsService implements UserDetailsService {

    @Autowired
    UsersRepository usersRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = usersRepository.findByUsername(s);

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList() {{ add(new SimpleGrantedAuthority(user.getRole().getRole())); }});
    }
}