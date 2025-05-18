package com.example.cinema.service.impl;

import com.example.cinema.entity.Country;
import com.example.cinema.repository.CountryRepository;
import com.example.cinema.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CountryServiceImpl implements CountryService {

    @Autowired
    private CountryRepository repository;

    @Override
    public List<Country> getAllCountries() {
        return repository.findAll();
    }

    @Override
    public Optional<Country> getCountryById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Country createCountry(Country country) {
        return repository.save(country);
    }

    @Override
    public Country updateCountry(Long id, Country updated) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setName(updated.getName());
                    existing.setSlug(updated.getSlug());
                    existing.setCreated_by(updated.getCreated_by());
                    existing.setUpdated_by(updated.getUpdated_by());
                    existing.setCreated_at(updated.getCreated_at());
                    existing.setUpdated_at(updated.getUpdated_at());
                    existing.setStatus(updated.getStatus());
                    return repository.save(existing);
                }).orElse(null);
    }

    @Override
    public void deleteCountry(Long id) {
        repository.deleteById(id);
    }
}
