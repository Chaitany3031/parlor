package com.angel.modal;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String reviewText;

    @Column(nullable = false)
    private Double rating;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Long salonId;

    private LocalDateTime createdAt;
}
