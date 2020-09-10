package com.blog.blog.Services;

import com.blog.blog.Models.Profile;
import com.blog.blog.Repositories.ProfilesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileService {

    @Autowired
    ProfilesRepository profilesRepository;

    public List<Profile> getAllProfiles(String direction, String field, Integer page, Integer size) {
        direction = (direction == null) ? "asc" : direction;
        field = (field == null) ? "id" : field;
        page = (page == null) ? 0 : page;
        size = (size == null) ? Integer.MAX_VALUE : size;

        return profilesRepository.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.valueOf(direction), field))).toList();
    }
}
