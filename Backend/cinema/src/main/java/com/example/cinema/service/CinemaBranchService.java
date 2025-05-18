package com.example.cinema.service;

import com.example.cinema.entity.CinemaBranch;

import java.util.List;
import java.util.Optional;

public interface CinemaBranchService {
    List<CinemaBranch> getAllBranches();

    Optional<CinemaBranch> getBranchById(Long id);

    CinemaBranch createBranch(CinemaBranch branch);

    CinemaBranch updateBranch(Long id, CinemaBranch branch);

    void deleteBranch(Long id);
}
