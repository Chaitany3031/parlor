package com.angel.service;

import com.angel.modal.Notification;
import com.angel.payload.dto.NotificationDTO;

import java.util.List;

public interface NotificationService {
    NotificationDTO createNotification(Notification notification) throws Exception;
    List<Notification> getAllNotificationByUserId(Long userId);
    List<Notification> getAllNotificationBySalonId(Long salonId);
    Notification markNotificationAsRead(Long notificationId) throws Exception;
}
