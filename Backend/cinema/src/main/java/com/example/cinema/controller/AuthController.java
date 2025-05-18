package com.example.cinema.controller;

import com.example.cinema.entity.User;
import com.example.cinema.service.UserService;
import com.example.cinema.security.JWTUtil;
import com.example.cinema.security.JwtResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${upload.path}")
    private String uploadDir;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestParam("file") MultipartFile file, @ModelAttribute User user) {
        // Kiểm tra username đã tồn tại
        Optional<User> existingUser = userService.getUserByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("❌ Username already exists");
        }

        // Kiểm tra email đã tồn tại
        Optional<User> existingEmail = userService.getUserByEmail(user.getEmail());
        if (existingEmail.isPresent()) {
            return ResponseEntity.badRequest().body("❌ Email already exists");
        }

        // Lưu trữ hình ảnh vào thư mục user-uploads
        try {
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            Path targetLocation = Path.of(uploadDir + File.separator + "user-uploads" + File.separator + fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            // Mã hóa password
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            // Thiết lập các trường mặc định
            user.setCreatedAt(new Date());
            user.setRole("USER");
            user.setStatus(1);
            user.setImage("user-uploads/" + fileName);

            userService.saveUser(user);

            return ResponseEntity.ok(
                    java.util.Map.of(
                            "success", true,
                            "message", "✅ Registration successful. Please login to get token."));
        } catch (IOException e) {
            return ResponseEntity.status(500).body("❌ Error: Cannot store the image.");
        }
    }

    // API ĐĂNG NHẬP
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOpt = userService.getUserByEmail(loginRequest.getEmail());

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Kiểm tra password
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                // Tạo token JWT
                String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
                return ResponseEntity
                        .ok(new JwtResponse("✅ Login successful", token, user.getImage(), user.getUsername()));
            } else {
                return ResponseEntity.status(401).body("❌ Invalid password");
            }
        } else {
            return ResponseEntity.status(404).body("❌ User not found");
        }
    }

    // Inner class cho login request
    public static class LoginRequest {
        private String email;
        private String password;

        // getters, setters
        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}
