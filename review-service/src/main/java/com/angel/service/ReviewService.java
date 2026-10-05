package com.angel.service;

import com.angel.dto.ReviewDTO;
import com.angel.dto.ReviewRequest;

import java.util.List;

public interface ReviewService {
    ReviewDTO createReview(ReviewRequest req);
    List<ReviewDTO> getReviewsBySalonId(Long salonId);
    ReviewDTO updateReview(Long reviewId, ReviewRequest req);
    void deleteReview(Long reviewId);
}
