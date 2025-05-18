package com.example.cinema.entity;

import jakarta.persistence.*;
import java.util.Date;

//////////////////////////
//Thông tin phim
/////////////////////////

@Entity
@Table(name = "movie")
public class Movie {

    public enum Position {
        NOW_SHOWING, // Phim Đang Chiếu
        COMING_SOON, // Phim Sắp Chiếu
        ENDED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String slug;
    private String description;
    private String trailer;
    private int duration;
    private double price;
    private String image;
    private int created_by;
    private int updated_by;
    private Date created_at;
    private Date updated_at;
    private int status;

    @Enumerated(EnumType.STRING)
    @Column(name = "position")
    private Position position; // NOW_SHOWING / COMING_SOON / ENDED

    @Column(name = "age_rating_id")
    private Long ageRatingId;

    @Column(name = "country_id")
    private Long countryId;

    // ===== Getter & Setter =====

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTrailer() {
        return trailer;
    }

    public void setTrailer(String trailer) {
        this.trailer = trailer;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Long getAgeRatingId() {
        return ageRatingId;
    }

    public void setAgeRatingId(Long ageRatingId) {
        this.ageRatingId = ageRatingId;
    }

    public Long getCountryId() {
        return countryId;
    }

    public void setCountryId(Long countryId) {
        this.countryId = countryId;
    }

    public int getCreated_by() {
        return created_by;
    }

    public void setCreated_by(int created_by) {
        this.created_by = created_by;
    }

    public int getUpdated_by() {
        return updated_by;
    }

    public void setUpdated_by(int updated_by) {
        this.updated_by = updated_by;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public Date getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(Date updated_at) {
        this.updated_at = updated_at;
    }
}
