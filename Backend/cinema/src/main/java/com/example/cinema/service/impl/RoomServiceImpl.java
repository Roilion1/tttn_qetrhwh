package com.example.cinema.service.impl;

import com.example.cinema.entity.Room;
import com.example.cinema.repository.RoomRepository;
import com.example.cinema.repository.CinemaBranchRepository;
import com.example.cinema.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private CinemaBranchRepository cinemaBranchRepository;

    @Override
    public Room createRoom(Room room) {
        Long branchId = room.getCinemaBranchId();
        boolean exists = cinemaBranchRepository.existsById(branchId);

        if (!exists) {
            throw new IllegalArgumentException("Cinema Branch with ID " + branchId + " does not exist.");
        }

        return roomRepository.save(room);
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }

    @Override
    public Room updateRoom(Long id, Room updatedRoom) {
        Optional<Room> optionalRoom = roomRepository.findById(id);
        if (optionalRoom.isPresent()) {
            // Kiểm tra xem cinemaBranchId mới có tồn tại không
            Long newBranchId = updatedRoom.getCinemaBranchId();
            if (!cinemaBranchRepository.existsById(newBranchId)) {
                throw new IllegalArgumentException("Cinema Branch with ID " + newBranchId + " does not exist.");
            }

            Room room = optionalRoom.get();
            room.setName(updatedRoom.getName());
            room.setSlug(updatedRoom.getSlug());
            room.setDescription(updatedRoom.getDescription());
            room.setCinemaBranchId(newBranchId);
            room.setCreated_by(updatedRoom.getCreated_by());
            room.setUpdated_by(updatedRoom.getUpdated_by());
            room.setCreated_at(updatedRoom.getCreated_at());
            room.setUpdated_at(updatedRoom.getUpdated_at());
            room.setStatus(updatedRoom.getStatus());
            return roomRepository.save(room);
        }
        throw new IllegalArgumentException("Room with ID " + id + " not found.");
    }

    @Override
    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
}
