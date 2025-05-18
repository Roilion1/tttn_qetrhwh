package com.example.cinema.entity;

import jakarta.persistence.*;
import java.util.Date;

//////////////////////////////////
///Chi nhánh rạp
/////////////////////////////////

@Entity
@Table(name = "cinema_branch")
public class CinemaBranch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name; // VD: "CGV Hai Bà Trưng"
    private String slug;
    private String description; // Địa chỉ và mô tả nằm trong description
    private int created_by;
    private int updated_by;
    private Date created_at;
    private Date updated_at;
    private int status;

    @Column(name = "google_map_url", columnDefinition = "TEXT")
    private String googleMapUrl;

    // Getters và Setters

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

    public String getGoogleMapUrl() {
        return googleMapUrl;
    }

    public void setGoogleMapUrl(String googleMapUrl) {
        this.googleMapUrl = googleMapUrl;
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
