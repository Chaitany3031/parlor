package com.angel.consumer;

import com.angel.config.RabbitMQConfig;
import com.angel.dto.BookingNotificationEvent;
import com.angel.modal.Notification;
import com.angel.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Slf4j
@RequiredArgsConstructor
public class NotificationConsumer {

    private final SimpMessagingTemplate messagingTemplate;
    private final NotificationRepository notificationRepository;

    @RabbitListener(queues = RabbitMQConfig.QUEUE)
    public void consumeBookingNotification(BookingNotificationEvent event) {
        log.info("Received booking notification event: {}", event);

        Notification notification = Notification.builder()
                .recipientId(event.getCustomerId())
                .salonId(event.getSalonId())
                .message(event.getMessage())
                .isRead(false)
                .createdAt(LocalDateTime.now())
                .build();

        Notification saved = notificationRepository.save(notification);

        // Broadcast to user websocket topic
        if (event.getCustomerId() != null) {
            messagingTemplate.convertAndSend("/topic/notification/" + event.getCustomerId(), saved);
        }

        // Broadcast to salon websocket topic
        if (event.getSalonId() != null) {
            messagingTemplate.convertAndSend("/topic/notification/salon/" + event.getSalonId(), saved);
        }
    }
}
