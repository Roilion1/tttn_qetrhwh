package com.example.cinema.service.impl;

import com.example.cinema.entity.CinemaBranch;
import com.example.cinema.repository.CinemaBranchRepository;
import com.example.cinema.service.CinemaBranchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CinemaBranchServiceImpl implements CinemaBranchService {

    @Autowired
    private CinemaBranchRepository branchRepository;

    @Override
    public List<CinemaBranch> getAllBranches() {
        return branchRepository.findAll();
    }

    @Override
    public Optional<CinemaBranch> getBranchById(Long id) {
        return branchRepository.findById(id);
    }

    @Override
    public CinemaBranch createBranch(CinemaBranch branch) {
        branch.setCreated_at(new Date());
        return branchRepository.save(branch);
    }

    @Override
    public CinemaBranch updateBranch(Long id, CinemaBranch branch) {
        Optional<CinemaBranch> existing = branchRepository.findById(id);
        if (existing.isPresent()) {
            CinemaBranch existingBranch = existing.get();
            existingBranch.setName(branch.getName());
            existingBranch.setSlug(branch.getSlug());
            existingBranch.setDescription(branch.getDescription());
            existingBranch.setGoogleMapUrl(branch.getGoogleMapUrl());
            existingBranch.setUpdated_by(branch.getUpdated_by());
            existingBranch.setUpdated_at(new Date());
            existingBranch.setStatus(branch.getStatus());
            return branchRepository.save(existingBranch);
        } else {
            throw new RuntimeException("Branch not found with id " + id);
        }
    }

    @Override
    public void deleteBranch(Long id) {
        branchRepository.deleteById(id);
    }
}
