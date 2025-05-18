package com.example.cinema.repository;

import com.example.cinema.entity.AgeRating;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgeRatingRepository extends JpaRepository<AgeRating, Long> {
}
