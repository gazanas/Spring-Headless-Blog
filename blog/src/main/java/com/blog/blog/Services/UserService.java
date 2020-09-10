package com.blog.blog.Services;

import com.blog.blog.Models.Profile;
import com.blog.blog.Models.User;
import com.blog.blog.Repositories.ProfilesRepository;
import com.blog.blog.Repositories.RolesRepository;
import com.blog.blog.Repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    RolesRepository rolesRepository;

    @Autowired
    ProfilesRepository profilesRepository;

    public List<User> getAllUsers(String direction, String field, Integer page, Integer size) {
        direction = (direction == null) ? "asc" : direction;
        field = (field == null) ? "id" : field;
        page = (page == null) ? 0 : page;
        size = (size == null) ? Integer.MAX_VALUE : size;

        return usersRepository.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.valueOf(direction.toUpperCase()), field))).toList();
    }

    public User getUserByUsername(String username) {
        return usersRepository.findByUsername(username);
    }

    public User getUserById(Integer uid) { return usersRepository.findById(uid).get(); }

    public void addUser(User user) {
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        user.setRole(rolesRepository.findById(1));
        Profile profile = profilesRepository.save(new Profile());
        user.setProfile(profile);
        usersRepository.save(user);
    }
}
