package com.angel.controller;

import com.angel.mapper.ReviewMapper;
import com.angel.modal.Review;
import com.angel.payload.dto.*;
import com.angel.service.ReviewService;
import com.angel.service.client.SalonFeignClient;
import com.angel.service.client.UserFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;
    private final UserFeignClient userFeignClient;
    private final SalonFeignClient salonFeignClient;
    @PostMapping("/salon/{salonId}")
    public ResponseEntity<Review> createReview(
            @PathVariable Long salonId,
            @RequestBody ReviewRequest req,
                                               @RequestHeader("Authorization") String jwt) throws Exception {
        UserDTO userDTO = userFeignClient.getUserProfile(jwt).getBody();
        SalonDTO salonDTO = salonFeignClient.getSalonById(salonId).getBody();
        Review review = reviewService.createReview(req,userDTO,salonDTO);
        return ResponseEntity.ok(review);
    }

    @GetMapping("/salon/{salonId}")
    public ResponseEntity<List<ReviewDTO>> getReviews(
            @PathVariable Long salonId,
            @RequestHeader("Authorization") String jwt) throws Exception {
        SalonDTO salonDTO = salonFeignClient.getSalonById(salonId).getBody();
        List<Review> reviews = reviewService.getReviewsBySalonId(salonDTO.getId());
        List<ReviewDTO> reviewDTOS = reviews.stream().map((review)->{
            UserDTO userDTO = null;
                    try{
userDTO = userFeignClient.getUserById(review.getUserId()).getBody();
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                    return ReviewMapper.toDTO(review,userDTO);
        }).toList();
        return ResponseEntity.ok(reviewDTOS);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<Review> updateReview(
            @PathVariable Long reviewId,
            @RequestBody ReviewRequest req,
            @RequestHeader("Authorization") String jwt) throws Exception {
        UserDTO userDTO = userFeignClient.getUserProfile(jwt).getBody();
        Review review = reviewService.updateReview(req,reviewId, userDTO.getId());
        return ResponseEntity.ok(review);
    }


    @DeleteMapping("/{reviewId}")
    public ResponseEntity<ApiResponse> deleteReview(
            @PathVariable Long reviewId,
            @RequestHeader("Authorization") String jwt) throws Exception {
        UserDTO userDTO = userFeignClient.getUserProfile(jwt).getBody();
        reviewService.deleteReview(reviewId, userDTO.getId());
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("Review deleted");
        return ResponseEntity.ok(apiResponse);
    }
}
