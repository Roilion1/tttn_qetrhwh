package com.example.cinema.service.impl;

import com.example.cinema.dto.request.SeatDTO;
import com.example.cinema.entity.Room;
import com.example.cinema.entity.Seat;
import com.example.cinema.repository.RoomRepository;
import com.example.cinema.repository.SeatRepository;
import com.example.cinema.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SeatServiceImpl implements SeatService {

    @Autowired
    private SeatRepository seatRepository;

    // @Override
    // public List<Seat> getAllSeats() {
    // return seatRepository.findAll();
    // }

    @Override
    public List<SeatDTO> getAllSeats() {
        List<Seat> seats = seatRepository.findAll();
        return seats.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public SeatDTO convertToDTO(Seat seat) {
        SeatDTO dto = new SeatDTO();
        dto.setId(seat.getId());
        dto.setSeatNumber(seat.getSeatNumber());
        dto.setSeatType(seat.getSeatType().name());
        dto.setStatus(seat.getStatus().name());
        dto.setDescription(seat.getDescription());
        Room room = seat.getRoom();
        if (room != null) {
            dto.setRoomId(room.getId());
        }
        return dto;
    }

    @Override
    public boolean reserveSeat(String seatNumber, Long userId) {
        Seat seat = seatRepository.findBySeatNumber(seatNumber)
                .orElseThrow(() -> new RuntimeException("Ghế không tồn tại"));

        if (!seat.getStatus().equals(Seat.SeatStatus.AVAILABLE)) {
            return false;
        }

        seat.setStatus(Seat.SeatStatus.RESERVED);
        // Không có reservedBy trong Seat, nếu cần, sẽ lưu ở SeatBooking
        seatRepository.save(seat);
        return true;
    }

    @Override
    public boolean reserveSeats(List<Seat> seats) {
        for (Seat seat : seats) {
            Seat existingSeat = seatRepository.findBySeatNumber(seat.getSeatNumber())
                    .orElseThrow(() -> new RuntimeException("Ghế không tồn tại: " + seat.getSeatNumber()));

            if (!existingSeat.getStatus().equals(Seat.SeatStatus.AVAILABLE)) {
                return false;
            }
        }

        for (Seat seat : seats) {
            Seat existingSeat = seatRepository.findBySeatNumber(seat.getSeatNumber())
                    .orElseThrow(() -> new RuntimeException("Ghế không tồn tại: " + seat.getSeatNumber()));

            existingSeat.setStatus(Seat.SeatStatus.RESERVED);
            seatRepository.save(existingSeat);
        }

        return true;
    }

    @Autowired
    private RoomRepository roomRepository; // Thêm RoomRepository

    @Override
    public void addSeat(SeatDTO seatDto) {
        // Tìm kiếm Room theo roomId từ DTO
        Room room = roomRepository.findById(seatDto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room không tồn tại"));
        // Tạo đối tượng Seat mới
        Seat seat = new Seat();
        seat.setSeatNumber(seatDto.getSeatNumber());
        seat.setSeatType(Seat.SeatType.valueOf(seatDto.getSeatType().toUpperCase()));
        seat.setDescription(seatDto.getDescription());
        seat.setStatus(Seat.SeatStatus.AVAILABLE);
        seat.setRoom(room); // Gán Room cho ghế
        // Lưu ghế vào cơ sở dữ liệu
        seatRepository.save(seat);
    }

    @Override
    public void createSeats() {
        // Tạo mẫu 6 hàng x 7 ghế ví dụ
        for (int row = 0; row < 6; row++) {
            for (int seatNum = 1; seatNum <= 7; seatNum++) {
                Seat seatEntity = new Seat();
                seatEntity.setSeatNumber("" + (char) ('A' + row) + seatNum);
                seatEntity.setSeatType(Seat.SeatType.NORMAL);
                seatEntity.setStatus(Seat.SeatStatus.AVAILABLE);
                seatRepository.save(seatEntity);
            }
        }
    }
}
