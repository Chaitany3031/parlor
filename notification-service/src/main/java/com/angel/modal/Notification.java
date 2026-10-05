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
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long recipientId;

    private Long salonId;

    @Column(nullable = false)
    private String message;

    private boolean isRead;

    private LocalDateTime createdAt;
}
