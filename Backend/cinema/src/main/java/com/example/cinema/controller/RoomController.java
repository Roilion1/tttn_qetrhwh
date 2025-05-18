package com.example.cinema.controller;

import com.example.cinema.entity.Room;
import com.example.cinema.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "*")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody Room room) {
        try {
            Room createdRoom = roomService.createRoom(room);
            return ResponseEntity.ok(createdRoom);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public List<Room> getAllRooms() {
        return roomService.getAllRooms();
    }

    @GetMapping("/{id}")
    public Optional<Room> getRoomById(@PathVariable Long id) {
        return roomService.getRoomById(id);
    }

    @PutMapping("/{id}")
    public Room updateRoom(@PathVariable Long id, @RequestBody Room room) {
        return roomService.updateRoom(id, room);
    }

    @DeleteMapping("/{id}")
    public String deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return "Room deleted successfully!";
    }
}
