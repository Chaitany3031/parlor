package com.angel.service;

import com.angel.domain.BookingStatus;
import com.angel.dto.BookingRequest;
import com.angel.dto.SalonDTO;
import com.angel.dto.ServiceDTO;
import com.angel.dto.UserDTO;
import com.angel.modal.Booking;
import com.angel.modal.SalonReport;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface BookingService {
    Booking createBooking(BookingRequest booking, UserDTO userDTO, SalonDTO salonDTO,
                          Set<ServiceDTO> serviceDTOSet) throws Exception;
    List<Booking> getBookingsByCustomer(Long customerId);
    List<Booking> getBookingsBySalon(Long salonId);
    Booking getBookingById(Long id) throws Exception;
    Booking updateBooking(Long bookingId, BookingStatus bookingStatus) throws Exception;
    List<Booking> getBookingsByDate(LocalDate date, Long salonId);
    SalonReport getSalonReport(Long salonId);
}
