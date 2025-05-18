package com.example.cinema.entity;

import jakarta.persistence.*;
import java.util.Date;

//////////////////////////////////////////
////Ghế trong phòng chiếu
/////////////////////////////////////////

@Entity
@Table(name = "seat")
public class Seat {

    public enum SeatType {
        NORMAL, // Ghế bình thường
        VIP, // Ghế VIP
        COUPLE // Ghế đôi
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String seatNumber;
    private SeatType seatType;
    private String description;
    private int created_by;
    private int updated_by;
    private Date created_at;
    private Date updated_at;
    private int status;

    @Column(name = "room_id")
    private Long roomId;

    // Getter và Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public SeatType getSeatType() {
        return seatType;
    }

    public void setSeatType(SeatType seatType) {
        this.seatType = seatType;
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