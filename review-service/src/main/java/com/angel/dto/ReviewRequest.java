package com.angel.dto;

import lombok.Data;

@Data
public class ReviewRequest {
    private String reviewText;
    private Double rating;
    private Long salonId;
    private Long userId;
}
