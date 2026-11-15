package com.angel.service.client;

import com.angel.domain.PaymentMethod;
import com.angel.dto.BookingDTO;
import com.angel.dto.PaymentLinkResponse;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@EnableFeignClients("PAYMENT-SERVICE")
public interface PaymentFeignClient {
    @PostMapping("/api/payments/create")
    public ResponseEntity<PaymentLinkResponse> createPaymentLink(
            @RequestBody BookingDTO bookingDTO,
            @RequestParam PaymentMethod paymentMethod
    );
}
