package com.angel.service.impl;

import com.angel.modal.Review;
import com.angel.payload.dto.ReviewRequest;
import com.angel.payload.dto.SalonDTO;
import com.angel.payload.dto.UserDTO;
import com.angel.repository.ReviewRepository;
import com.angel.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class ReviewServiceImp implements ReviewService {

    private final ReviewRepository reviewRepository;

    @Override
    public Review createReview(ReviewRequest req, UserDTO user, SalonDTO salon) {
        Review review = new Review();//18:24:55
        review.setReviewText(req.getReviewText());
        review.setRating(req.getRating());
        review.setUserId(user.getId());
        review.setSalonId(salon.getId());

        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getReviewsBySalonId(Long salonId) {
        return reviewRepository.findBySalonId(salonId);
    }

    private Review getReviewById(Long id) throws Exception {
        return reviewRepository.findById(id).orElseThrow(
                ()-> new Exception("review not .....")
        );
    }

    @Override
    public Review updateReview(ReviewRequest req, Long reviewId, Long userId) throws Exception {
       Review review = getReviewById(reviewId);
       if(!review.getUserId().equals(userId)){
           throw new Exception("you don't have permission to update this review");
       }
       review.setReviewText(req.getReviewText());
       review.setRating(req.getRating());
        return reviewRepository.save(review);
    }

    @Override
    public void deleteReview(Long reviewId, Long userId) throws Exception {
        Review review = getReviewById(reviewId);
        if(!review.getUserId().equals(userId)){
            throw new Exception("you don't have permission to delete this review");
        }
        reviewRepository.delete(review);
    }
}
