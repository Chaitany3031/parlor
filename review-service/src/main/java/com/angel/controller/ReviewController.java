package com.angel.controller;

import com.angel.dto.ReviewDTO;
import com.angel.dto.ReviewRequest;
import com.angel.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ReviewDTO> createReview(@RequestBody ReviewRequest req) {
        ReviewDTO created = reviewService.createReview(req);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/salon/{salonId}")
    public ResponseEntity<List<ReviewDTO>> getSalonReviews(@PathVariable Long salonId) {
        List<ReviewDTO> reviews = reviewService.getReviewsBySalonId(salonId);
        return ResponseEntity.ok(reviews);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<ReviewDTO> updateReview(
            @PathVariable Long reviewId,
            @RequestBody ReviewRequest req) {
        ReviewDTO updated = reviewService.updateReview(reviewId, req);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<String> deleteReview(@PathVariable Long reviewId) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.ok("Review deleted successfully");
    }
}
