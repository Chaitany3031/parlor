package com.angel.service;

import com.angel.domain.PaymentMethod;
import com.angel.modal.PaymentOrder;
import com.angel.payload.dto.BookingDTO;
import com.angel.payload.dto.UserDTO;
import com.angel.payload.response.PaymentLinkResponse;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayException;

public interface PaymentService {
    PaymentLinkResponse createOrder(
            UserDTO user,
            BookingDTO booking,
            PaymentMethod paymentMethod
    ) throws RazorpayException;
    PaymentOrder getPaymentOrderById(Long id) throws Exception;
    PaymentOrder getPaymentOrderByPaymentId(String paymentId);
    PaymentLink createRazorpayPaymentLink(UserDTO user,
                                          Long amount,
                                          Long orderId) throws RazorpayException;
    String createStripePaymentLink(UserDTO user,
                                   Long amount,
                                   Long orderId);

}
