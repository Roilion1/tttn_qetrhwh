package com.example.cinema.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.cinema.dto.request.VnpayRequest;
import com.example.cinema.service.VnpayService;

@RestController
@RequestMapping("/api/payment/vnpay")
public class VnpayController {

    private VnpayService vnpayService;

    public VnpayController(VnpayService vnpayService) {
        this.vnpayService = vnpayService;
    }

    @PostMapping
    public ResponseEntity<String> createPayment(@RequestBody VnpayRequest paymentRequest) {
        try {
            String paymentUrl = vnpayService.createPayment(paymentRequest);
            return ResponseEntity.ok(paymentUrl);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đã xảy ra lỗi khi tạo thanh toán!");
        }
    }

    @GetMapping("/tettet")
    public ResponseEntity<String> returnPaymentestt() {
        return ResponseEntity.ok("Okie");
    }

    @GetMapping("/return")
    public ResponseEntity<String> returnPayment(@RequestParam("vnp_ResponseCode") String responseCode) {
        return vnpayService.handlePaymentReturn(responseCode);
    }
}