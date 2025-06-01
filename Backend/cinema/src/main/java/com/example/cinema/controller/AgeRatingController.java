package com.example.cinema.controller;

import com.example.cinema.entity.AgeRating;
import com.example.cinema.service.AgeRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/age-ratings")
public class AgeRatingController {

    @Autowired
    private AgeRatingService service;

    // Lấy danh sách đang hoạt động
    @GetMapping
    public List<AgeRating> getAll() {
        return service.getAllAgeRatings();
    }

    // Lấy theo ID
    @GetMapping("/{id}")
    public Optional<AgeRating> getById(@PathVariable Long id) {
        return service.getAgeRatingById(id);
    }

    // Tạo mới
    @PostMapping
    public AgeRating create(@RequestBody AgeRating ageRating) {
        return service.createAgeRating(ageRating);
    }

    // Cập nhật
    @PutMapping("/{id}")
    public AgeRating update(@PathVariable Long id, @RequestBody AgeRating ageRating) {
        return service.updateAgeRating(id, ageRating);
    }

    // Xoá mềm (đưa vào thùng rác)
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        service.softDeleteAgeRating(id);
    }

    // Lấy danh sách đã xoá (thùng rác)
    @GetMapping("/trash")
    public List<AgeRating> getTrashed() {
        return service.getTrashedAgeRatings();
    }

    // Khôi phục từ thùng rác
    @GetMapping("/restore/{id}")
    public ResponseEntity<String> restore(@PathVariable Long id) {
        service.restoreAgeRating(id);
        return ResponseEntity.ok("Khôi phục thành công");
    }

    // Xoá vĩnh viễn
    @DeleteMapping("/destroy/{id}")
    public ResponseEntity<String> destroy(@PathVariable Long id) {
        service.destroyAgeRating(id);
        return ResponseEntity.ok("Xoá vĩnh viễn thành công");
    }
}
