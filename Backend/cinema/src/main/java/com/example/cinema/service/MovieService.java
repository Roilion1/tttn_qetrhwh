package com.example.cinema.service;

import com.example.cinema.entity.Movie;
import com.example.cinema.entity.Movie.Position;

import java.util.List;

public interface MovieService {
    List<Movie> getAllMovies();

    Movie findById(Long id);

    Movie getMovieById(Long id);

    Movie createMovie(Movie movie);

    Movie updateMovie(Long id, Movie movie);

    void deleteMovie(Long id);

    List<Movie> findByPosition(Position position);
}
