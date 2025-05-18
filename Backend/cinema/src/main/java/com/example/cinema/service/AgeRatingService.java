package com.example.cinema.service;

import com.example.cinema.entity.AgeRating;

import java.util.List;
import java.util.Optional;

public interface AgeRatingService {
    List<AgeRating> getAllAgeRatings();

    Optional<AgeRating> getAgeRatingById(Long id);

    AgeRating createAgeRating(AgeRating ageRating);

    AgeRating updateAgeRating(Long id, AgeRating ageRating);

    void deleteAgeRating(Long id);
}
