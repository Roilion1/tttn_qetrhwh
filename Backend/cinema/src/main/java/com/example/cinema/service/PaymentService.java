package com.example.cinema.service;

import com.example.cinema.entity.Payment;

import java.util.List;

public interface PaymentService {
    Payment createPayment(Payment payment);

    Payment getPaymentById(Long id);

    List<Payment> getAllPayments();
}
