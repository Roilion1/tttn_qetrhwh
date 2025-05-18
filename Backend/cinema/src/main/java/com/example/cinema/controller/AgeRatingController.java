package com.example.cinema.controller;

import com.example.cinema.entity.AgeRating;
import com.example.cinema.service.AgeRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/age-ratings")
public class AgeRatingController {

    @Autowired
    private AgeRatingService service;

    @GetMapping
    public List<AgeRating> getAll() {
        return service.getAllAgeRatings();
    }

    @GetMapping("/{id}")
    public Optional<AgeRating> getById(@PathVariable Long id) {
        return service.getAgeRatingById(id);
    }

    @PostMapping
    public AgeRating create(@RequestBody AgeRating ageRating) {
        return service.createAgeRating(ageRating);
    }

    @PutMapping("/{id}")
    public AgeRating update(@PathVariable Long id, @RequestBody AgeRating ageRating) {
        return service.updateAgeRating(id, ageRating);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteAgeRating(id);
    }
}
