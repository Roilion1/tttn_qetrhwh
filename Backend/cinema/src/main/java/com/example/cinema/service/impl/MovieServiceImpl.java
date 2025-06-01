package com.example.cinema.service.impl;

import com.example.cinema.entity.Movie;
import com.example.cinema.repository.MovieRepository;
import com.example.cinema.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class MovieServiceImpl implements MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Override
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    @Override
    public Movie getMovieById(Long id) {
        Optional<Movie> optional = movieRepository.findById(id);
        return optional.orElse(null);
    }

    @Override
    public Movie createMovie(Movie movie) {
        movie.setCreated_at(new Date());
        movie.setUpdated_at(new Date());
        return movieRepository.save(movie);
    }

    @Override
    public Movie findById(Long id) {
        return movieRepository.findById(id).orElse(null);
    }

    @Override
    public Movie updateMovie(Long id, Movie movie) {
        Optional<Movie> optional = movieRepository.findById(id);
        if (optional.isPresent()) {
            Movie existing = optional.get();
            existing.setName(movie.getName());
            existing.setSlug(movie.getSlug());
            existing.setDescription(movie.getDescription());
            existing.setTrailer(movie.getTrailer());
            existing.setDuration(movie.getDuration());
            existing.setPrice(movie.getPrice());
            existing.setImage(movie.getImage());
            existing.setPosition(movie.getPosition());
            existing.setStatus(movie.getStatus());
            existing.setAgeRatingId(movie.getAgeRatingId());
            existing.setCountryId(movie.getCountryId());
            existing.setUpdated_by(movie.getUpdated_by());
            existing.setUpdated_at(new Date());
            return movieRepository.save(existing);
        }
        return null;
    }

    @Override
    public void deleteMovie(Long id) {
        movieRepository.deleteById(id);
    }

    @Override
    public List<Movie> findByPosition(Movie.Position position) {
        return movieRepository.findByPosition(position);
    }
}
