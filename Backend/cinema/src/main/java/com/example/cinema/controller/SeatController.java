package com.example.cinema.controller;

import com.example.cinema.dto.request.SeatDTO;
import com.example.cinema.dto.request.SeatReservationRequest;
import com.example.cinema.entity.Seat;
import com.example.cinema.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/seats")
@CrossOrigin(origins = "*")
public class SeatController {

    @Autowired
    private SeatService seatService;

    @GetMapping
    public List<Seat> getAllSeats() {
        return seatService.getAllSeats();
    }

    @PostMapping("/reserve")
    public ResponseEntity<?> reserveSeats(@RequestBody SeatReservationRequest request) {
        Long userId = request.getUserId();
        List<SeatDTO> seatsDto = request.getSeats();

        List<Seat> seats;
        try {
            seats = seatsDto.stream().map(dto -> {
                Seat seat = new Seat();
                seat.setSeatNumber(dto.getSeatNumber());
                seat.setSeatType(Seat.SeatType.valueOf(dto.getSeatType().toUpperCase()));
                seat.setStatus(Seat.SeatStatus.RESERVED);
                return seat;
            }).collect(Collectors.toList());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Giá trị seatType không hợp lệ");
        }

        boolean success = seatService.reserveSeats(seats);

        if (success) {
            return ResponseEntity.ok("Đặt ghế thành công");
        } else {
            return ResponseEntity.status(409).body("Ghế đã có người chọn");
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addSeat(@RequestBody Seat seat) {
        try {
            seatService.addSeat(seat);
            return ResponseEntity.ok("Ghế đã được thêm thành công");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi khi thêm ghế: " + e.getMessage());
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createSeats() {
        try {
            seatService.createSeats();
            return ResponseEntity.ok("Ghế đã được tạo thành công");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi khi tạo ghế: " + e.getMessage());
        }
    }
}
