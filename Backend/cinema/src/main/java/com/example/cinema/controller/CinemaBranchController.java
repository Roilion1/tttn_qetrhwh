package com.example.cinema.controller;

import com.example.cinema.entity.CinemaBranch;
import com.example.cinema.service.CinemaBranchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/branches")
@CrossOrigin(origins = "*")
public class CinemaBranchController {

    @Autowired
    private CinemaBranchService branchService;

    @GetMapping
    public ResponseEntity<List<CinemaBranch>> getAllBranches() {
        return ResponseEntity.ok(branchService.getAllBranches());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CinemaBranch> getBranchById(@PathVariable Long id) {
        Optional<CinemaBranch> branch = branchService.getBranchById(id);
        return branch.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CinemaBranch> createBranch(@RequestBody CinemaBranch branch) {
        return ResponseEntity.ok(branchService.createBranch(branch));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CinemaBranch> updateBranch(@PathVariable Long id, @RequestBody CinemaBranch branch) {
        return ResponseEntity.ok(branchService.updateBranch(id, branch));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBranch(@PathVariable Long id) {
        branchService.deleteBranch(id);
        return ResponseEntity.noContent().build();
    }
}
