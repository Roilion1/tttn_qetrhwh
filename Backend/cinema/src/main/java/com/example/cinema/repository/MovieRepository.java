package com.example.cinema.repository;

import com.example.cinema.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.cinema.entity.Movie.Position;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findByPosition(Position position);
}
