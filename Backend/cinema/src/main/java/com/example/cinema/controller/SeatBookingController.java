package com.example.cinema.controller;

import com.example.cinema.dto.request.SeatBookingRequest;
import com.example.cinema.entity.SeatBooking;
import com.example.cinema.service.SeatBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class SeatBookingController {

    @Autowired
    private SeatBookingService bookingService;

    @PostMapping
    public SeatBooking createBooking(@RequestBody SeatBooking booking) {
        return bookingService.createBooking(booking);
    }

    @GetMapping("/{id}")
    public Optional<SeatBooking> getBooking(@PathVariable Long id) {
        return bookingService.getBookingById(id);
    }

    @GetMapping("/showtime/{showtimeId}")
    public List<SeatBooking> getBookingsByShowtime(@PathVariable Long showtimeId) {
        return bookingService.getBookingsByShowtime(showtimeId);
    }

    @GetMapping("/user/{userId}")
    public List<SeatBooking> getBookingsByUser(@PathVariable Long userId) {
        return bookingService.getBookingsByUser(userId);
    }

    @PostMapping("/{id}/cancel")
    public void cancelBooking(@PathVariable Long id) {
        bookingService.cancelBooking(id);
    }

    @PostMapping("/{id}/confirm")
    public SeatBooking confirmPayment(@PathVariable Long id) {
        return bookingService.confirmPayment(id);
    }

    @PostMapping("/confirm-booking")
    public ResponseEntity<?> confirmBooking(@RequestBody SeatBookingRequest request) {
        try {
            bookingService.confirmSeatBooking(request);
            return ResponseEntity.ok("Thanh toán thành công và đã lưu SeatBooking!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi: " + e.getMessage());
        }
    }
}
