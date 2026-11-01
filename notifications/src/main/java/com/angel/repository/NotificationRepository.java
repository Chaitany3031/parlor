package com.angel.repository;

import com.angel.modal.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification,Long> {
    List<Notification> findByUserId(Long userId);
    List<Notification> findBySalonId(Long salonId);
}
