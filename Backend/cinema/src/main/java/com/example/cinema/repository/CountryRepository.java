package com.example.cinema.repository;

import com.example.cinema.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country, Long> {
}
