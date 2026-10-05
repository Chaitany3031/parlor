package com.angel.controller;

import com.angel.dto.NotificationDTO;
import com.angel.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<NotificationDTO>> getUserNotifications(@PathVariable Long userId) {
        List<NotificationDTO> notifications = notificationService.getUserNotifications(userId);
        return ResponseEntity.ok(notifications);
    }

    @GetMapping("/salon/{salonId}")
    public ResponseEntity<List<NotificationDTO>> getSalonNotifications(@PathVariable Long salonId) {
        List<NotificationDTO> notifications = notificationService.getSalonNotifications(salonId);
        return ResponseEntity.ok(notifications);
    }

    @PutMapping("/{notificationId}/read")
    public ResponseEntity<NotificationDTO> markAsRead(@PathVariable Long notificationId) {
        NotificationDTO dto = notificationService.markAsRead(notificationId);
        return ResponseEntity.ok(dto);
    }
}
