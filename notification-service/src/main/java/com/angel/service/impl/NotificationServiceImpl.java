package com.angel.service.impl;

import com.angel.dto.NotificationDTO;
import com.angel.modal.Notification;
import com.angel.repository.NotificationRepository;
import com.angel.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Override
    public List<NotificationDTO> getUserNotifications(Long userId) {
        return notificationRepository.findByRecipientIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<NotificationDTO> getSalonNotifications(Long salonId) {
        return notificationRepository.findBySalonIdOrderByCreatedAtDesc(salonId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public NotificationDTO markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found with id " + notificationId));
        notification.setRead(true);
        Notification updated = notificationRepository.save(notification);
        return mapToDTO(updated);
    }

    private NotificationDTO mapToDTO(Notification n) {
        NotificationDTO dto = new NotificationDTO();
        dto.setId(n.getId());
        dto.setRecipientId(n.getRecipientId());
        dto.setSalonId(n.getSalonId());
        dto.setMessage(n.getMessage());
        dto.setRead(n.isRead());
        dto.setCreatedAt(n.getCreatedAt());
        return dto;
    }
}
