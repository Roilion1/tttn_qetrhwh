package com.example.cinema.service;

import com.example.cinema.entity.Showtime;

import java.util.List;
import java.util.Optional;

public interface ShowtimeService {
    Showtime createShowtime(Showtime showtime);

    List<Showtime> getAllShowtimes();

    Optional<Showtime> getShowtimeById(Long id);

    Showtime updateShowtime(Long id, Showtime updatedShowtime);

    void deleteShowtime(Long id);

    List<Showtime> getShowtimesByMovieId(Long movieId);
}
