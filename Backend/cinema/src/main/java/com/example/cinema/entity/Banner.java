package com.example.cinema.entity;

import jakarta.persistence.*;
import java.util.Date;

///////////////////////////////////////
////Hình ảnh quảng cáo
///////////////////////////////////////

@Entity
@Table(name = "banner")
public class Banner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // Chỉ lưu tên file ảnh, ví dụ: banner1.jpg
    private String image;
    private int priority;
    private int created_by;
    private int updated_by;
    private Date created_at;
    private Date updated_at;
    private int status;

    // ===== Getter & Setter =====
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
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