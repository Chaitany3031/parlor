package com.angel.controller;

import com.angel.domain.BookingStatus;
import com.angel.domain.PaymentMethod;
import com.angel.dto.*;
import com.angel.mapper.BookingMapper;
import com.angel.modal.Booking;
import com.angel.modal.SalonReport;
import com.angel.service.BookingService;
import com.angel.service.client.PaymentFeignClient;
import com.angel.service.client.SalonFeignClient;
import com.angel.service.client.ServiceOfferingFeignClient;
import com.angel.service.client.UserFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;
    private final SalonFeignClient salonFeignClient;
    private final UserFeignClient userFeignClient;
    private final ServiceOfferingFeignClient serviceOfferingFeignClient;
    private final PaymentFeignClient paymentFeignClient;

    @PostMapping
    public ResponseEntity<PaymentLinkResponse> createBooking(
            @RequestParam Long salonId,
            @RequestParam PaymentMethod paymentMethod,
            @RequestBody BookingRequest bookingRequest,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        UserDTO user = userFeignClient.getUserProfile(jwt).getBody();
        SalonDTO salonDTO = salonFeignClient.getSalonById(salonId).getBody();
        Set<ServiceDTO> serviceDTOSet = serviceOfferingFeignClient.getServicesById(bookingRequest.getServiceIds()).getBody();

        if(serviceDTOSet == null || serviceDTOSet.isEmpty()){
            throw new Exception("service not found...");
        }

        Booking booking = bookingService.createBooking(bookingRequest,user,salonDTO,serviceDTOSet);

        BookingDTO bookingDTO = BookingMapper.toDTO(booking);

        PaymentLinkResponse paymentLinkResponse = paymentFeignClient.createPaymentLink(bookingDTO,paymentMethod,jwt).getBody();

        return ResponseEntity.ok(paymentLinkResponse);
    }

    @GetMapping("/customer")
    public ResponseEntity<Set<BookingDTO>> getBookingsByCustomer(
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        UserDTO userDTO = userFeignClient.getUserProfile(jwt).getBody();
        if(userDTO==null || userDTO.getId()==null){
            throw new Exception("user not found from jwt .......");
        }
        List<Booking> bookings = bookingService.getBookingsByCustomer(userDTO.getId());
        return ResponseEntity.ok(getBookingDTOs(bookings));
    }

    @GetMapping("/salon")
    public ResponseEntity<Set<BookingDTO>> getBookingsBySalon(
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        SalonDTO salonDTO = salonFeignClient.getSalonByOwnerId(jwt).getBody();
        List<Booking> bookings = bookingService.getBookingsBySalon(salonDTO.getId());
        return ResponseEntity.ok(getBookingDTOs(bookings));
    }

    private Set<BookingDTO> getBookingDTOs(List<Booking> bookings){
        return bookings.stream().map(BookingMapper::toDTO).collect(Collectors.toSet());
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
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        SalonDTO salonDTO = salonFeignClient.getSalonByOwnerId(jwt).getBody();
        SalonReport salonReport = bookingService.getSalonReport(1L);
        return ResponseEntity.ok(salonReport);
    }
}
