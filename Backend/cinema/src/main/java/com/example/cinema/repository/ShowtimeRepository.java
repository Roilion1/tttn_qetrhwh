package com.example.cinema.repository;

import com.example.cinema.entity.Showtime;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {
    List<Showtime> findByMovieId(Long movieId);
}
