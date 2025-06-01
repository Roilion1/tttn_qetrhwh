package com.example.cinema.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "payment")
public class Payment {

    public enum PaymentMethod {
        VNPAY,
        MOMO,
        ZALOPAY
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double amount;
    private int created_by;
    private int updated_by;
    private Date created_at;
    private Date updated_at;
    private String paymentStatus;
    private Date paymentTime;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    // Liên kết với SeatBooking
    @Column(name = "seat_booking_id")
    private Long seatBookingId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seat_booking_id", insertable = false, updatable = false)
    private SeatBooking seatBooking;

    // ---------- Getter & Setter ----------

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
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

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public Date getPaymentTime() {
        return paymentTime;
    }

    public void setPaymentTime(Date paymentTime) {
        this.paymentTime = paymentTime;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Long getSeatBookingId() {
        return seatBookingId;
    }

    public void setSeatBookingId(Long seatBookingId) {
        this.seatBookingId = seatBookingId;
    }

    public SeatBooking getSeatBooking() {
        return seatBooking;
    }

    public void setSeatBooking(SeatBooking seatBooking) {
        this.seatBooking = seatBooking;
    }
}
