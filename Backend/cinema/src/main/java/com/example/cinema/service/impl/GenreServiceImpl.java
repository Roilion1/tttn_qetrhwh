package com.example.cinema.service.impl;

import com.example.cinema.entity.Genre;
import com.example.cinema.repository.GenreRepository;
import com.example.cinema.service.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class GenreServiceImpl implements GenreService {

    @Autowired
    private GenreRepository genreRepository;

    @Override
    public List<Genre> getAllGenres() {
        return genreRepository.findAll();
    }

    @Override
    public Optional<Genre> getGenreById(Long id) {
        return genreRepository.findById(id);
    }

    @Override
    public Genre createGenre(Genre genre) {
        genre.setCreated_at(new Date());
        genre.setUpdated_at(new Date());
        return genreRepository.save(genre);
    }

    @Override
    public Genre updateGenre(Long id, Genre genreDetails) {
        Optional<Genre> optionalGenre = genreRepository.findById(id);
        if (optionalGenre.isPresent()) {
            Genre genre = optionalGenre.get();
            genre.setName(genreDetails.getName());
            genre.setSlug(genreDetails.getSlug());
            genre.setDescription(genreDetails.getDescription());
            genre.setUpdated_by(genreDetails.getUpdated_by());
            genre.setUpdated_at(new Date());
            genre.setStatus(genreDetails.getStatus());
            return genreRepository.save(genre);
        } else {
            throw new RuntimeException("Genre not found with id " + id);
        }
    }

    @Override
    public void deleteGenre(Long id) {
        genreRepository.deleteById(id);
    }
}
