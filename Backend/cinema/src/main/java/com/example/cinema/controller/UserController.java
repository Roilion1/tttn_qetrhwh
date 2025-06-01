package com.example.cinema.controller;

import com.example.cinema.entity.User;
import com.example.cinema.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(consumes = "multipart/form-data")
    public User createUser(@ModelAttribute User user,
            @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
            String uploadDir = "images/user-uploads/";
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            File dest = new File(uploadDir + fileName);
            dest.getParentFile().mkdirs();
            file.transferTo(dest);

            user.setImage("/images/user-uploads/" + fileName);
        } else {
            user.setImage(null); // hoặc giữ nguyên
        }
        return userService.saveUser(user);
    }

    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public User updateUser(@PathVariable Long id, @ModelAttribute User user,
            @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        Optional<User> existingUserOpt = userService.getUserById(id);
        if (existingUserOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User existingUser = existingUserOpt.get();

        // Cập nhật các trường dữ liệu
        existingUser.setUsername(user.getUsername());
        existingUser.setFullName(user.getFullName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPhone(user.getPhone());
        existingUser.setDateOfBirth(user.getDateOfBirth());
        existingUser.setPassword(user.getPassword());
        existingUser.setRole(user.getRole());
        existingUser.setStatus(user.getStatus());

        // Cập nhật updatedAt
        existingUser.setUpdatedAt(new Date());

        // Nếu có upload file mới thì cập nhật ảnh
        if (file != null && !file.isEmpty()) {
            String uploadDir = "images/user-uploads/";
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            File dest = new File(uploadDir + fileName);
            dest.getParentFile().mkdirs();
            file.transferTo(dest);

            existingUser.setImage("/images/user-uploads/" + fileName);
        }

        return userService.saveUser(existingUser);
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "User deleted with id: " + id;
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @GetMapping("/username/{username}")
    public Optional<User> getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
