package com.example.cinema.controller;

import com.example.cinema.entity.Country;
import com.example.cinema.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/countries")
public class CountryController {

    @Autowired
    private CountryService service;

    @GetMapping
    public List<Country> getAll() {
        return service.getAllCountries();
    }

    @GetMapping("/{id}")
    public Optional<Country> getById(@PathVariable Long id) {
        return service.getCountryById(id);
    }

    @PostMapping
    public Country create(@RequestBody Country country) {
        return service.createCountry(country);
    }

    @PutMapping("/{id}")
    public Country update(@PathVariable Long id, @RequestBody Country country) {
        return service.updateCountry(id, country);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteCountry(id);
    }
}
