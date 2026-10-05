package com.angel.repository;

import com.angel.modal.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findBySalonIdOrderByCreatedAtDesc(Long salonId);
    List<Review> findByUserId(Long userId);
}
