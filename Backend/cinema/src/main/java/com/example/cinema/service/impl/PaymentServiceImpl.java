package com.example.cinema.service.impl;

import com.example.cinema.entity.Payment;
import com.example.cinema.repository.PaymentRepository;
import com.example.cinema.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public Payment createPayment(Payment payment) {
        // Lưu Payment, SeatBooking sẽ được cascade lưu tự động nếu set đúng
        return paymentRepository.save(payment);
    }

    @Override
    public Payment getPaymentById(Long id) {
        Optional<Payment> payment = paymentRepository.findById(id);
        return payment.orElse(null);
    }

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }
}
