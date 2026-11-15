package com.angel.mapper;

import com.angel.payload.dto.BookingDTO;
import com.angel.payload.dto.NotificationDTO;

public class NotificationMapper {
    public static NotificationDTO toDTO(Notification notification,
                                 BookingDTO bookingDTO){
    NotificationDTO notificationDTO = new NotificationDTO();
    notificationDTO.setId(notification.getId());
    notificationDTO.setType(notification.getType());
    notificationDTO.setIsRead(notification.getIsRead());
    notificationDTO.setDescription(notification.getDescription());
    notificationDTO.setBookingId(bookingDTO.getId());
    notificationDTO.setUserId(notification.getUserId());
    notificationDTO.setSalonId(notification.getSalonId());
    notificationDTO.setCreatedAt(notification.getCreatedAt());
    return notificationDTO;
    }
}
