package com.example.cinema.entity;

import jakarta.persistence.*;
import java.util.Date;

//////////////////////////
/// Giới hạn độ tuổi
//////////////////////////

@Entity
@Table(name = "age_rating")
public class AgeRating {

    public enum Rating {
        P, C13, C16, C18
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private int created_by;
    private int updated_by;
    private Date created_at;
    private Date updated_at;
    private int status;

    @Enumerated(EnumType.STRING)
    @Column(name = "rating", nullable = false)
    private Rating rating;

    // ===== Getter và Setter =====

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Rating getRating() {
        return rating;
    }

    public void setRating(Rating rating) {
        this.rating = rating;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
