package com.angel.service;

import com.angel.dto.NotificationDTO;

import java.util.List;

public interface NotificationService {
    List<NotificationDTO> getUserNotifications(Long userId);
    List<NotificationDTO> getSalonNotifications(Long salonId);
    NotificationDTO markAsRead(Long notificationId);
}
