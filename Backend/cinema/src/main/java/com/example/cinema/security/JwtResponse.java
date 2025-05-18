package com.example.cinema.security;

public class JwtResponse {
    private String message;
    private String token;
    private String image;
    private String username;

    public JwtResponse(String message, String token, String image, String username) {
        this.message = message;
        this.token = token;
        this.image = image;
        this.username = username;
    }

    // getters and setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
