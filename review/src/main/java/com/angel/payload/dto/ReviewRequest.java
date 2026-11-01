package com.angel.payload.dto;

import lombok.Data;

@Data
public class ReviewRequest {
    private String reviewText;
    private Double rating;
}
