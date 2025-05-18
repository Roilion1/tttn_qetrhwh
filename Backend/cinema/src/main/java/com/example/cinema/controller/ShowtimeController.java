package com.example.cinema.controller;

import com.example.cinema.entity.Showtime;
import com.example.cinema.service.ShowtimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/showtimes")
public class ShowtimeController {

    @Autowired
    private ShowtimeService showtimeService;

    @PostMapping
    public Showtime createShowtime(@RequestBody Showtime showtime) {
        return showtimeService.createShowtime(showtime);
    }

    @GetMapping
    public List<Showtime> getAllShowtimes() {
        return showtimeService.getAllShowtimes();
    }

    @GetMapping("/{id}")
    public Optional<Showtime> getShowtimeById(@PathVariable Long id) {
        return showtimeService.getShowtimeById(id);
    }

    @PutMapping("/{id}")
    public Showtime updateShowtime(@PathVariable Long id, @RequestBody Showtime showtime) {
        return showtimeService.updateShowtime(id, showtime);
    }

    @DeleteMapping("/{id}")
    public void deleteShowtime(@PathVariable Long id) {
        showtimeService.deleteShowtime(id);
    }

    @GetMapping("/movie/{movieId}")
    public ResponseEntity<List<Showtime>> getShowtimesByMovieId(@PathVariable Long movieId) {
        List<Showtime> showtimes = showtimeService.getShowtimesByMovieId(movieId);
        if (showtimes.isEmpty()) {
            return ResponseEntity.noContent().build(); 
        }
        return ResponseEntity.ok(showtimes);
    }

}
