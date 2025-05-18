package com.example.cinema.service.impl;

import com.example.cinema.entity.User;
import com.example.cinema.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Tìm user theo email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng với email: " + email));

        // Chuyển role (ví dụ ROLE_USER) thành authority
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole());

        // Trả về UserDetails object
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.singletonList(authority));
    }
}
