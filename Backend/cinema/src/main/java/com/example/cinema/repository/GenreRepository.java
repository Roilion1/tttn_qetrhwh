package com.example.cinema.repository;

import com.example.cinema.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Long> {
    Genre findBySlug(String slug);
}
