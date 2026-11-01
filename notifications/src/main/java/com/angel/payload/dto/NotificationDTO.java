package com.angel.payload.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NotificationDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String type;
    private Boolean isRead = false;
    private Long userId;
    private Long bookingId;
    private String description;
    private Long salonId;
    private LocalDateTime createdAt;
    private BookingDTO bookingDTO;
}
