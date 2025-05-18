package com.example.cinema.service;

import com.example.cinema.entity.Country;

import java.util.List;
import java.util.Optional;

public interface CountryService {
    List<Country> getAllCountries();

    Optional<Country> getCountryById(Long id);

    Country createCountry(Country country);

    Country updateCountry(Long id, Country country);

    void deleteCountry(Long id);
}
