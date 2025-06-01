package com.example.cinema.service;

import com.example.cinema.dto.request.SeatBookingRequest;
import com.example.cinema.entity.SeatBooking;

import java.util.List;
import java.util.Optional;

public interface SeatBookingService {
    SeatBooking createBooking(SeatBooking seatBooking);

    Optional<SeatBooking> getBookingById(Long id);

    List<SeatBooking> getBookingsByShowtime(Long showtimeId);

    List<SeatBooking> getBookingsByUser(Long userId);

    void cancelBooking(Long id);

    SeatBooking confirmPayment(Long id);

    void confirmSeatBooking(SeatBookingRequest request);
}
