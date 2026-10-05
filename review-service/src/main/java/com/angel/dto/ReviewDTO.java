package com.angel.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReviewDTO {
    private Long id;
    private String reviewText;
    private Double rating;
    private Long userId;
    private Long salonId;
    private LocalDateTime createdAt;
}
