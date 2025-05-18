package com.example.cinema.entity;

import jakarta.persistence.*;
import java.util.Date;
import java.time.LocalDate;
import java.time.LocalTime;

////////////////////////////////////
///Lịch chiếu
///////////////////////////////////

@Entity
@Table(name = "showtime")
public class Showtime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate showDate;
    private LocalTime showTime;
    private int created_by;
    private int updated_by;
    private Date created_at;
    private Date updated_at;
    private int status;

    @Column(name = "movie_id")
    private Long movieId;

    @Column(name = "cinema_branch_id")
    private Long cinemaBranchId;

    @Column(name = "room_id")
    private Long roomId;

    // ======= Getter và Setter =======

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public Long getCinemaBranchId() {
        return cinemaBranchId;
    }

    public void setCinemaBranchId(Long cinemaBranchId) {
        this.cinemaBranchId = cinemaBranchId;
    }

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public LocalDate getShowDate() {
        return showDate;
    }

    public void setShowDate(LocalDate showDate) {
        this.showDate = showDate;
    }

    public LocalTime getShowTime() {
        return showTime;
    }

    public void setShowTime(LocalTime showTime) {
        this.showTime = showTime;
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
