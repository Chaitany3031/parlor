package com.angel.service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("BOOKING-SERVICE")
public interface BookingFeignClient {
    @GetMapping("/api/bookings/{bookingId}")
    public ResponseEntity<BookingDTO> getBookingsById(
            @PathVariable("bookingId") Long bookingId
    ) throws Exception;
}
