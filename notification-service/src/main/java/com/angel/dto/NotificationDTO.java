package com.angel.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class NotificationDTO {
    private Long id;
    private Long recipientId;
    private Long salonId;
    private String message;
    private boolean isRead;
    private LocalDateTime createdAt;
}
