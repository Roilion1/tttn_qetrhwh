package com.example.cinema.service.impl;

import com.example.cinema.entity.AgeRating;
import com.example.cinema.repository.AgeRatingRepository;
import com.example.cinema.service.AgeRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AgeRatingServiceImpl implements AgeRatingService {

    @Autowired
    private AgeRatingRepository repository;

    @Override
    public List<AgeRating> getAllAgeRatings() {
        return repository.findAll();
    }

    @Override
    public Optional<AgeRating> getAgeRatingById(Long id) {
        return repository.findById(id);
    }

    @Override
    public AgeRating createAgeRating(AgeRating ageRating) {
        return repository.save(ageRating);
    }

    @Override
    public AgeRating updateAgeRating(Long id, AgeRating updated) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setRating(updated.getRating());
                    existing.setDescription(updated.getDescription());
                    existing.setCreated_by(updated.getCreated_by());
                    existing.setUpdated_by(updated.getUpdated_by());
                    existing.setCreated_at(updated.getCreated_at());
                    existing.setUpdated_at(updated.getUpdated_at());
                    existing.setStatus(updated.getStatus());
                    return repository.save(existing);
                }).orElse(null);
    }

    @Override
    public void deleteAgeRating(Long id) {
        repository.deleteById(id);
    }
}
