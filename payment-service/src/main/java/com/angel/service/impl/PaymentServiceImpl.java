package com.angel.service.impl;

import com.angel.domain.PaymentMethod;
import com.angel.modal.PaymentOrder;
import com.angel.payload.dto.BookingDTO;
import com.angel.payload.dto.UserDTO;
import com.angel.payload.response.PaymentLinkResponse;
import com.angel.repository.PaymentOrderRepository;
import com.angel.service.PaymentService;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final PaymentOrderRepository paymentOrderRepository;

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @Value("${razorpay.api.key}")
    private String razorpayApiKey;

    @Value("${razorpay.api.secret}")
    private String razorpayApiSecret;


    @Override
    public PaymentLinkResponse createOrder(UserDTO user, BookingDTO booking, PaymentMethod paymentMethod) throws RazorpayException {
        Long amount = (long) booking.getTotalPrice();
        PaymentOrder order = new PaymentOrder();
        order.setAmount(amount);
        order.setPaymentMethod(paymentMethod);
        order.setBookingId(booking.getId());
        order.setSalonId(booking.getSalonId());
        PaymentOrder savedOrder = paymentOrderRepository.save(order);


        PaymentLinkResponse paymentLinkResponse = new PaymentLinkResponse();


        if(paymentMethod.equals(PaymentMethod.RAZORPAY)){
            PaymentLink payment = createRazorpayPaymentLink(user,
                    savedOrder.getAmount(),
                    savedOrder.getId());

            String paymentUrl = payment.get("short_url");
            String paymentUrlId = payment.get("id");
            paymentLinkResponse.setPayment_link_url(paymentUrl);
            paymentLinkResponse.setPayment_link_id(paymentUrlId);
            savedOrder.setPaymentLinkId(paymentUrlId);
            paymentOrderRepository.save(savedOrder);
        }else{
            String paymentUrl = createStripePaymentLink(user,
                    savedOrder.getAmount(),
                    savedOrder.getId());
            paymentLinkResponse.setPayment_link_url(paymentUrl);
        }

        return paymentLinkResponse ;
    }

    @Override
    public PaymentOrder getPaymentOrderById(Long id) throws Exception {
        PaymentOrder paymentOrder = paymentOrderRepository.findById(id).orElse(null);
        if(paymentOrder==null){
            throw new Exception("pyment order not found");
        }

        return paymentOrder;
    }

    @Override
    public PaymentOrder getPaymentOrderByPaymentId(String paymentId) {
        return paymentOrderRepository.findByPaymentLinkId(paymentId);
    }

    @Override
    public PaymentLink createRazorpayPaymentLink(UserDTO user, Long Amount, Long orderId) throws RazorpayException {
        Long amount = Amount*100;
            RazorpayClient razorpayClient = new RazorpayClient(razorpayApiKey,razorpayApiSecret);

            //details
        JSONObject paymentLinkRequest = new JSONObject();
        paymentLinkRequest.put("amount",amount);
        paymentLinkRequest.put("currency","INR");

        JSONObject customer = new JSONObject();
        customer.put("name",user.getFullName());
        customer.put("email",user.getEmail());

        paymentLinkRequest.put("customer",customer);

        JSONObject notify = new JSONObject();
        notify.put("email",true);

        paymentLinkRequest.put("notify",notify);

        paymentLinkRequest.put("reminder_enable",true);

        paymentLinkRequest.put("callback_url","http://localhost:3000/payment-success/"+orderId);

        paymentLinkRequest.put("callback_method","get");

        return razorpayClient.paymentLink.create(paymentLinkRequest);

    }

    @Override
    public String createStripePaymentLink(UserDTO user, Long amount, Long orderId) {
        return "";
    }
}
