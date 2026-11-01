package com.angel.service.impl;

import com.angel.mapper.NotificationMapper;
import com.angel.modal.Notification;
import com.angel.payload.dto.BookingDTO;
import com.angel.payload.dto.NotificationDTO;
import com.angel.repository.NotificationRepository;
import com.angel.service.NotificationService;
import com.angel.service.client.BookingFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationSercviceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final BookingFeignClient bookingFeignClient;

    @Override
    public NotificationDTO createNotification(Notification notification) throws Exception {
        Notification savedNotification = notificationRepository.save(notification);
        BookingDTO bookingDTO = bookingFeignClient.getBookingsById(savedNotification.getBookingId()).getBody();
        NotificationDTO notificationDTO = NotificationMapper.toDTO(savedNotification,bookingDTO);
        return notificationDTO;
    }

    @Override
    public List<Notification> getAllNotificationByUserId(Long userId) {
        return notificationRepository.findByUserId(userId);
    }

    @Override
    public List<Notification> getAllNotificationBySalonId(Long salonId) {
        return notificationRepository.findBySalonId(salonId);
    }

    @Override
    public Notification markNotificationAsRead(Long notificationId) throws Exception {
        return notificationRepository.findById(notificationId).map(
                notification -> {
                    notification.setIsRead(true);
                    return notificationRepository.save(notification);
                }
        ).orElseThrow(()-> new Exception("Notification not found"));
    }
}
