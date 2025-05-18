package com.example.cinema.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Map URL /images/** → thư mục images/
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:images/");

        // Map URL /user-uploads/** → thư mục images/user-uploads/
        registry.addResourceHandler("/user-uploads/**")
                .addResourceLocations("file:./images/user-uploads/");
    }
}
