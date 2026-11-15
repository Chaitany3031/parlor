package com.angel.payload.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class ReviewDTO {
    private Long id;
    private UserDTO userDTO;
    private SalonDTO salonDTO;
    private String reviewText;
    private double rating;
    private LocalDateTime createdAt;
}
