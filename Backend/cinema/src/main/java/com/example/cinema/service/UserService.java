package com.example.cinema.service;

import com.example.cinema.entity.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    User saveUser(User user);

    User updateUser(Long id, User user);

    void deleteUser(Long id);

    Optional<User> getUserById(Long id);

    Optional<User> getUserByEmail(String email);

    List<User> getAllUsers();

    Optional<User> getUserByUsername(String username);
}
