package com.example.cinema.service.impl;

import com.example.cinema.entity.User;
import com.example.cinema.repository.UserRepository;
import com.example.cinema.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Long id, User user) {
        user.setId(id);
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email); // Sử dụng email để tìm kiếm
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserByUsername(String username) { // 👈 THÊM
        return userRepository.findByUsername(username);
    }
}
