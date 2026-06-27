package com.angel.controller;

import com.angel.domain.BookingStatus;
import com.angel.dto.*;
import com.angel.mapper.BookingMapper;
import com.angel.modal.Booking;
import com.angel.modal.SalonReport;
import com.angel.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;
    @PostMapping
    public ResponseEntity<Booking> createBooking(
            @RequestParam Long salonId,
            @RequestBody BookingRequest bookingRequest
    ) throws Exception {
        UserDTO user = new UserDTO();
        user.setId(1L);
        SalonDTO salonDTO = new SalonDTO();
        salonDTO.setId(salonId);
        salonDTO.setOpenTime(LocalTime.now());
        salonDTO.setCloseTime(LocalTime.now().plusHours(12));
//        salonDTO.setOpenTime(LocalTime.now());
//        salonDTO.setCloseTime(LocalTime.now().plusHours(12));
        Set<ServiceDTO> serviceDTOSet = new HashSet<>();
        ServiceDTO serviceDTO = new ServiceDTO();
        serviceDTO.setId(1L);
        serviceDTO.setPrice(2130);
        serviceDTO.setDuration(30);
        serviceDTO.setName("Haircut for angel");

        serviceDTOSet.add(serviceDTO);

        Booking booking = bookingService.createBooking(bookingRequest,user,salonDTO,serviceDTOSet);
        return ResponseEntity.ok(booking);
    }
    @GetMapping("/customer")
    public ResponseEntity<Set<BookingDTO>> getBookingsByCustomer(

    ){
        List<Booking> bookings = bookingService.getBookingsBySalon(1L);
        return ResponseEntity.ok(getBookingDTOs(bookings));
    }

    @GetMapping("/salon")
    public ResponseEntity<Set<BookingDTO>> getBookingsBySalon(

    ){
        List<Booking> bookings = bookingService.getBookingsByCustomer(1L);
        return ResponseEntity.ok(getBookingDTOs(bookings));
    }

    private Set<BookingDTO> getBookingDTOs(List<Booking> bookings){
        return bookings.stream().map(booking->{
            return BookingMapper.toDTO(booking);
        }).collect(Collectors.toSet());
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<BookingDTO> getBookingsById(
    @PathVariable Long bookingId
    ) throws Exception {
        Booking booking = bookingService.getBookingById(bookingId);
        return ResponseEntity.ok(BookingMapper.toDTO(booking));
    }

    @PutMapping("/{bookingId}/status")
    public ResponseEntity<BookingDTO> updateBookingStatus(
            @PathVariable Long bookingId,
            @RequestParam BookingStatus status
            ) throws Exception {
        Booking booking = bookingService.updateBooking(bookingId,status);
        return ResponseEntity.ok(BookingMapper.toDTO(booking));
    }

    @GetMapping("/slots/salon/{salonId}/date/{date}")
    public ResponseEntity<List<BookingSlotDTO>> getBookedSlot(
            @PathVariable Long salonId,
            @RequestParam(required = false) LocalDate date
            ) throws Exception {
        List<Booking> bookings = bookingService.getBookingsByDate(date,salonId);
        List<BookingSlotDTO> slotDTOs = bookings.stream().map(booking -> {
            BookingSlotDTO slotDTO = new BookingSlotDTO();
            slotDTO.setStartTime(booking.getStartTime());
            slotDTO.setEndTime(booking.getEndTime());
            return slotDTO;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(slotDTOs);
    }

    @GetMapping("/report")
    public ResponseEntity<SalonReport> getSalonReport(
    ) throws Exception {
       SalonReport salonReport = bookingService.getSalonReport(1L);
        return ResponseEntity.ok(salonReport);
    }
}
