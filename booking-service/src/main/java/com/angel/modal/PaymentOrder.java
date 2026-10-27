package com.angel.modal;

import com.angel.domain.PaymentMethod;
import com.angel.domain.PaymentOrderStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class PaymentOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false)
    private Long amount;
    @Column(nullable = false)
    private PaymentOrderStatus status=PaymentOrderStatus.PENDING;
    @Column(nullable = false)
    private PaymentMethod paymentMethod;
    private String paymentLinkId;
    @Column(nullable = false)
    private Long userId;
    @Column(nullable = false)
    private Long bookingId;
    @Column(nullable=false)
    private Long salonId;
}
