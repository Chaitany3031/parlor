package com.angel.service;

import com.angel.modal.Review;
import com.angel.payload.dto.ReviewRequest;
import com.angel.payload.dto.SalonDTO;
import com.angel.payload.dto.UserDTO;

import java.util.List;

public interface ReviewService {
    Review createReview(
            ReviewRequest req,
            UserDTO user,
            SalonDTO salon
    );
    List<Review> getReviewsBySalonId(Long salonId);
    Review updateReview(ReviewRequest req,Long reviewId, Long userId) throws Exception;
    void deleteReview(Long reviewId,Long userId) throws Exception;
}
