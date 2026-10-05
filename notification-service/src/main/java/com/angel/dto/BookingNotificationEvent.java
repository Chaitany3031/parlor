package com.angel.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingNotificationEvent implements Serializable {
    private Long bookingId;
    private Long customerId;
    private Long salonId;
    private String message;
}
