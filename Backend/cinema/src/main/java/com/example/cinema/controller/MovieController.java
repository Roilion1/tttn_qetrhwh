package com.example.cinema.controller;

import com.example.cinema.entity.Movie;
import com.example.cinema.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "*")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping("/now-showing")
    public List<Movie> getNowShowing() {
        return movieService.findByPosition(Movie.Position.NOW_SHOWING);
    }

    @GetMapping("/coming-soon")
    public List<Movie> getComingSoon() {
        return movieService.findByPosition(Movie.Position.COMING_SOON);
    }

    @GetMapping
    public List<Movie> getAllMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping("/{id}")
    public Movie getMovieById(@PathVariable Long id) {
        return movieService.getMovieById(id);
    }

    @PostMapping
    public Movie createMovie(@RequestBody Movie movie) {
        return movieService.createMovie(movie);
    }

    @PutMapping("/{id}")
    public Movie updateMovie(@PathVariable Long id, @RequestBody Movie movie) {
        return movieService.updateMovie(id, movie);
    }

    @DeleteMapping("/{id}")
    public void deleteMovie(@PathVariable Long id) {
        movieService.deleteMovie(id);
    }

}
