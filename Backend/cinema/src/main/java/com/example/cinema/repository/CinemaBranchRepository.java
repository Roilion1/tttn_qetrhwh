package com.example.cinema.repository;

import com.example.cinema.entity.CinemaBranch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CinemaBranchRepository extends JpaRepository<CinemaBranch, Long> {
}
