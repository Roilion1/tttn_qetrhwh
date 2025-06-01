package com.example.cinema.service.impl;

import com.example.cinema.dto.request.SeatBookingRequest;
import com.example.cinema.entity.Seat;
import com.example.cinema.entity.SeatBooking;
import com.example.cinema.repository.SeatBookingRepository;
import com.example.cinema.repository.SeatRepository;
import com.example.cinema.service.SeatBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class SeatBookingServiceImpl implements SeatBookingService {

    @Autowired
    private SeatBookingRepository seatBookingRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Override
    public SeatBooking createBooking(SeatBooking seatBooking) {
        return seatBookingRepository.save(seatBooking);
    }

    @Override
    public Optional<SeatBooking> getBookingById(Long id) {
        return seatBookingRepository.findById(id);
    }

    @Override
    public List<SeatBooking> getBookingsByShowtime(Long showtimeId) {
        return seatBookingRepository.findByShowtimeId(showtimeId);
    }

    @Override
    public List<SeatBooking> getBookingsByUser(Long userId) {
        return seatBookingRepository.findByUserId(userId);
    }

    @Override
    public void cancelBooking(Long id) {
        seatBookingRepository.deleteById(id);
    }

    @Override
    public SeatBooking confirmPayment(Long id) {
        SeatBooking booking = seatBookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy booking với ID: " + id));
        booking.setStatus(SeatBooking.BookingStatus.BOOKED);
        booking.setUpdated_at(new Date());
        return seatBookingRepository.save(booking);
    }

    // ✅ Thêm method xác nhận đặt vé (dùng sau khi thanh toán thành công)
    public void confirmSeatBooking(SeatBookingRequest request) {
        Seat seat = seatRepository.findById(request.getSeatId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy ghế"));

        if (seat.getStatus() != Seat.SeatStatus.RESERVED) {
            throw new RuntimeException("Ghế chưa được đặt hoặc đã thanh toán");
        }

        // 1. Cập nhật trạng thái ghế
        seat.setStatus(Seat.SeatStatus.BOOKED);
        seatRepository.save(seat);

        // 2. Lưu vào bảng seat_booking
        SeatBooking booking = new SeatBooking();
        booking.setSeatId(request.getSeatId());
        booking.setUserId(request.getUserId());
        booking.setShowtimeId(request.getShowtimeId());
        booking.setStatus(SeatBooking.BookingStatus.BOOKED);
        booking.setBookingTime(new Date());
        booking.setCreated_by(request.getCreatedBy());
        booking.setUpdated_by(request.getUpdatedBy());
        booking.setCreated_at(new Date());
        booking.setUpdated_at(new Date());

        seatBookingRepository.save(booking);
    }
}
