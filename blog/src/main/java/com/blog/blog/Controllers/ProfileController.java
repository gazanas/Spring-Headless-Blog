package com.blog.blog.Controllers;

import com.blog.blog.Models.Profile;
import com.blog.blog.Services.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProfileController {

    @Autowired
    ProfileService profileService;

    @RequestMapping(value = "/profile/all", method = RequestMethod.GET)
    public List<Profile> getAllProfiles(@RequestParam(required = false) String direction, @RequestParam(required = false) String field, @RequestParam(required = false) Integer page, @RequestParam(required = false) Integer size) {
        return profileService.getAllProfiles(direction, field, page, size);
    }
}