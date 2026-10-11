package com.angel.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class BookingRequest {
    //5:24:00
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Set<Long> serviceIds;


}
