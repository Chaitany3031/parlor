package com.angel.controller;

import com.angel.domain.PaymentMethod;
import com.angel.dto.UserDTO;
import com.angel.modal.PaymentOrder;
import com.angel.payload.dto.BookingDTO;
import com.angel.payload.response.PaymentLinkResponse;
import com.angel.service.PaymentService;
import com.angel.service.client.UserFeignClient;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;
    private final UserFeignClient userFeignClient;
    @PostMapping("/create")
    public ResponseEntity<PaymentLinkResponse> createPaymentLink(
            @RequestBody BookingDTO bookingDTO,
            @RequestParam PaymentMethod paymentMethod,
            @RequestHeader("Authorization") String jwt
            ) throws Exception {
        UserDTO userDTO = userFeignClient.getUserProfile(jwt).getBody();

        PaymentLinkResponse res = paymentService.createOrder(userDTO,bookingDTO,paymentMethod);


        return ResponseEntity.ok(res);
    }

    @GetMapping("/{paymentOrderId}")
    public ResponseEntity<PaymentOrder> getPaymentOrderById(
            @PathVariable Long paymentOrderId
    ) throws Exception {

        PaymentOrder res = paymentService.getPaymentOrderById(paymentOrderId);

        return ResponseEntity.ok(res);
    }

    @PatchMapping("/proceed")
    public ResponseEntity<Boolean> proceedPayment(
            @RequestParam String paymentId,
            @RequestParam String paymentLinkId
    ) throws Exception {
        PaymentOrder paymentOrder = paymentService.getPaymentOrderByPayemntId(paymentLinkId);
        Boolean res = paymentService.proceedPayment(paymentOrder,paymentId,paymentLinkId);

        return ResponseEntity.ok(res);
    }


}
