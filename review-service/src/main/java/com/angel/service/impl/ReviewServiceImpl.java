package com.angel.service.impl;

import com.angel.dto.ReviewDTO;
import com.angel.dto.ReviewRequest;
import com.angel.modal.Review;
import com.angel.repository.ReviewRepository;
import com.angel.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    @Override
    public ReviewDTO createReview(ReviewRequest req) {
        Review review = Review.builder()
                .reviewText(req.getReviewText())
                .rating(req.getRating())
                .salonId(req.getSalonId())
                .userId(req.getUserId())
                .createdAt(LocalDateTime.now())
                .build();
        Review saved = reviewRepository.save(review);
        return mapToDTO(saved);
    }

    @Override
    public List<ReviewDTO> getReviewsBySalonId(Long salonId) {
        return reviewRepository.findBySalonIdOrderByCreatedAtDesc(salonId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ReviewDTO updateReview(Long reviewId, ReviewRequest req) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found with id " + reviewId));
        review.setReviewText(req.getReviewText());
        review.setRating(req.getRating());
        Review updated = reviewRepository.save(review);
        return mapToDTO(updated);
    }

    @Override
    public void deleteReview(Long reviewId) {
        reviewRepository.deleteById(reviewId);
    }

    private ReviewDTO mapToDTO(Review review) {
        ReviewDTO dto = new ReviewDTO();
        dto.setId(review.getId());
        dto.setReviewText(review.getReviewText());
        dto.setRating(review.getRating());
        dto.setUserId(review.getUserId());
        dto.setSalonId(review.getSalonId());
        dto.setCreatedAt(review.getCreatedAt());
        return dto;
    }
}
