package com.example.cinema.service.impl;

import com.example.cinema.entity.Showtime;
import com.example.cinema.repository.ShowtimeRepository;
import com.example.cinema.repository.MovieRepository;
import com.example.cinema.repository.CinemaBranchRepository;
import com.example.cinema.repository.RoomRepository;
import com.example.cinema.service.ShowtimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShowtimeServiceImpl implements ShowtimeService {

    @Autowired
    private ShowtimeRepository showtimeRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private CinemaBranchRepository cinemaBranchRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Override
    public Showtime createShowtime(Showtime showtime) {
        Long movieId = showtime.getMovieId();
        Long branchId = showtime.getCinemaBranchId();
        Long roomId = showtime.getRoomId();

        if (!movieRepository.existsById(movieId)) {
            throw new IllegalArgumentException("Movie with ID " + movieId + " does not exist.");
        }

        if (!cinemaBranchRepository.existsById(branchId)) {
            throw new IllegalArgumentException("Cinema Branch with ID " + branchId + " does not exist.");
        }

        if (!roomRepository.existsById(roomId)) {
            throw new IllegalArgumentException("Room with ID " + roomId + " does not exist.");
        }

        return showtimeRepository.save(showtime);
    }

    @Override
    public List<Showtime> getAllShowtimes() {
        return showtimeRepository.findAll();
    }

    @Override
    public List<Showtime> getShowtimesByMovieId(Long movieId) {
        return showtimeRepository.findByMovieId(movieId);
    }

    @Override
    public Optional<Showtime> getShowtimeById(Long id) {
        return showtimeRepository.findById(id);
    }

    @Override
    public Showtime updateShowtime(Long id, Showtime updatedShowtime) {
        Optional<Showtime> optional = showtimeRepository.findById(id);
        if (optional.isPresent()) {

            Long movieId = updatedShowtime.getMovieId();
            Long branchId = updatedShowtime.getCinemaBranchId();
            Long roomId = updatedShowtime.getRoomId();

            if (!movieRepository.existsById(movieId)) {
                throw new IllegalArgumentException("Movie with ID " + movieId + " does not exist.");
            }

            if (!cinemaBranchRepository.existsById(branchId)) {
                throw new IllegalArgumentException("Cinema Branch with ID " + branchId + " does not exist.");
            }

            if (!roomRepository.existsById(roomId)) {
                throw new IllegalArgumentException("Room with ID " + roomId + " does not exist.");
            }

            Showtime showtime = optional.get();
            showtime.setShowDate(updatedShowtime.getShowDate());
            showtime.setShowTime(updatedShowtime.getShowTime());
            showtime.setMovieId(movieId);
            showtime.setCinemaBranchId(branchId);
            showtime.setRoomId(roomId);
            showtime.setCreated_by(updatedShowtime.getCreated_by());
            showtime.setUpdated_by(updatedShowtime.getUpdated_by());
            showtime.setCreated_at(updatedShowtime.getCreated_at());
            showtime.setUpdated_at(updatedShowtime.getUpdated_at());
            showtime.setStatus(updatedShowtime.getStatus());

            return showtimeRepository.save(showtime);
        }
        throw new IllegalArgumentException("Showtime with ID " + id + " not found.");
    }

    @Override
    public void deleteShowtime(Long id) {
        showtimeRepository.deleteById(id);
    }
}
