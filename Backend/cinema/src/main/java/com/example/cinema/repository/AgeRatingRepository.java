package com.example.cinema.repository;

import com.example.cinema.entity.AgeRating;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AgeRatingRepository extends JpaRepository<AgeRating, Long> {
    List<AgeRating> findByDeleted(boolean deleted);
}
