package com.example.cinema.repository;

import com.example.cinema.entity.SeatBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatBookingRepository extends JpaRepository<SeatBooking, Long> {
    List<SeatBooking> findByShowtimeId(Long showtimeId);

    List<SeatBooking> findByUserId(Long userId);

    List<SeatBooking> findBySeatIdAndShowtimeId(Long seatId, Long showtimeId);

    List<SeatBooking> findByShowtimeIdAndStatus(Long showtimeId, SeatBooking.BookingStatus status);

}
