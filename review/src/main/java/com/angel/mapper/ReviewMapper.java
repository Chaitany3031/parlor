package com.angel.mapper;

import com.angel.modal.Review;
import com.angel.payload.dto.ReviewDTO;
import com.angel.payload.dto.UserDTO;

public class ReviewMapper {
    public static ReviewDTO toDTO(Review review, UserDTO userDTO){
        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.setId(review.getId());
        reviewDTO.setReviewText(review.getReviewText());
        reviewDTO.setUserDTO(userDTO);
        reviewDTO.setRating(review.getRating());
        reviewDTO.setCreatedAt(review.getCreatedAt());
        return reviewDTO;
    }
}
