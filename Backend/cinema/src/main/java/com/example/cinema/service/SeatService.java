package com.example.cinema.service;

import com.example.cinema.dto.request.SeatDTO;
import com.example.cinema.entity.Seat;

import java.util.List;

public interface SeatService {

    // List<Seat> getAllSeats();

    List<SeatDTO> getAllSeats();

    boolean reserveSeat(String seatNumber, Long userId);

    boolean reserveSeats(List<Seat> seats);

    // void addSeat(Seat seat);

    void addSeat(SeatDTO seatDto);

    void createSeats();

    SeatDTO convertToDTO(Seat seat);

}
