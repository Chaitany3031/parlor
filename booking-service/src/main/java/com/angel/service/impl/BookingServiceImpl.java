package com.angel.service.impl;

import com.angel.domain.BookingStatus;
import com.angel.dto.BookingRequest;
import com.angel.dto.SalonDTO;
import com.angel.dto.ServiceDTO;
import com.angel.dto.UserDTO;
import com.angel.modal.Booking;
import com.angel.modal.SalonReport;
import com.angel.repository.BookingRepository;
import com.angel.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {
    private final BookingRepository bookingRepository;
    @Override
    public Booking createBooking(BookingRequest booking,
                                 UserDTO userDTO,
                                 SalonDTO salonDTO,
                                 Set<ServiceDTO> serviceDTOSet) throws Exception {
        int totalDuration = serviceDTOSet.stream().
                mapToInt(ServiceDTO::getDuration)
                .sum();
        LocalDateTime bookingStartTime=booking.getStartTime();
        LocalDateTime bookingEndTime=bookingStartTime.plusMinutes(totalDuration);
        Boolean isSlotAvailable=isTimeSlotAvailable(salonDTO,bookingStartTime,bookingEndTime);
        int totalPrice=serviceDTOSet.stream().mapToInt(ServiceDTO::getPrice).sum();
        Set<Long> idList = serviceDTOSet.stream().map(ServiceDTO::getId).collect(Collectors.toSet());
        Booking newBooking = new Booking();
        newBooking.setCustomerId(userDTO.getId());
        newBooking.setSalonId(salonDTO.getId());
        newBooking.setServiceIds(idList);
        newBooking.setStatus(BookingStatus.PENDING);
        newBooking.setStartTime(bookingStartTime);
        newBooking.setEndTime(bookingEndTime);
        newBooking.setTotalServices(totalPrice);
        return bookingRepository.save(newBooking);
    }

    public Boolean isTimeSlotAvailable(SalonDTO salonDTO,
                                       LocalDateTime bookingStartTime,
                                       LocalDateTime bookingEndTime) throws Exception {
        List<Booking> existingBookings = getBookingsBySalon(salonDTO.getId());
//        LocalDateTime salonOpenTime = salonDTO.getOpenTime().atDate(bookingStartTime.toLocalDate());
//        LocalDateTime salonCloseTime = salonDTO.getCloseTime().atDate(bookingStartTime.toLocalDate());
        LocalDateTime salonOpenTime = salonDTO.getOpenTime().atDate(bookingStartTime.toLocalDate());
        LocalDateTime salonCloseTime = salonDTO.getCloseTime().atDate(bookingStartTime.toLocalDate());
        if (salonDTO.getCloseTime().isBefore(salonDTO.getOpenTime())) {
            salonCloseTime = salonCloseTime.plusDays(1);
        }
        System.out.println("----------------------------------------------------------------");
        System.out.println("Salon Open Time  : " + salonOpenTime);
        System.out.println("Salon Close Time : " + salonCloseTime);
        System.out.println("Booking Start    : " + bookingStartTime);
        System.out.println("Booking End      : " + bookingEndTime);
        System.out.println("----------------------------------------------------------------");
        System.out.println("----------------------------------------------------------------");
        System.out.println(
                "isBefore Open: " +
                        bookingStartTime.isBefore(salonOpenTime)
        );

        System.out.println(
                "isAfter Close: " +
                        bookingEndTime.isAfter(salonCloseTime)
        );
        System.out.println("----------------------------------------------------------------");
        if(bookingStartTime.isBefore(salonOpenTime) || bookingEndTime.isAfter(salonCloseTime)){
            throw new Exception("Booking time must be between salon's working hours");
        }
        for(Booking existingBooking:existingBookings){
            LocalDateTime existingBookingStartTime=existingBooking.getStartTime();
            LocalDateTime existingBookingEndTime=existingBooking.getEndTime();
            if(bookingStartTime.isBefore(existingBookingEndTime) && bookingEndTime.isAfter(existingBookingStartTime)){
            throw new Exception("slot not available , choose different time");
            }
            if(bookingStartTime.isEqual(existingBookingStartTime) || bookingEndTime.isEqual(existingBookingEndTime)){
                throw new Exception("slot not available , choose different time");
            }
        }
        return true;
    }

    @Override
    public List<Booking> getBookingsByCustomer(Long customerId) {
        return bookingRepository.findByCustomerId(customerId);
    }

    @Override
    public List<Booking> getBookingsBySalon(Long salonId) {
        return bookingRepository.findBySalonId(salonId);
    }

    @Override
    public Booking getBookingById(Long id) throws Exception {
        Booking booking = bookingRepository.findById(id).orElse(null);
        if(booking==null){
            throw new Exception("booking not found");
        }
        return booking;
    }

    @Override
    public Booking updateBooking(Long bookingId, BookingStatus bookingStatus) throws Exception {
        Booking booking = getBookingById(bookingId);
        booking.setStatus(bookingStatus);
        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getBookingsByDate(LocalDate date, Long salonId) {
        List<Booking> allBookings = getBookingsBySalon(salonId);
        if(date==null){
            return allBookings;
        }
        return allBookings.stream().filter(booking->isSameDate(booking.getStartTime(),date) || isSameDate(booking.getEndTime(),date)).collect(Collectors.toList());
    }

    private boolean isSameDate(LocalDateTime dateTime, LocalDate date) {
        return dateTime.toLocalDate().isEqual(date);
    }

    @Override
    public SalonReport getSalonReport(Long salonId) {
        List<Booking> bookings = getBookingsBySalon(salonId);
        int totalEarnings = bookings.stream().mapToInt(Booking::getTotalServices).sum();
        Integer totalBooking = bookings.size();
        List<Booking> cancelledBookings=bookings.stream()
                .filter(booking -> booking.getStatus().equals(BookingStatus.CANCELLED)).collect(Collectors.toList());
        Double totalRefund = cancelledBookings.stream().mapToDouble(Booking::getTotalServices).sum();
        SalonReport report = new SalonReport();
        report.setSalonId(salonId);
        report.setCancelledBookings(cancelledBookings.size());
        report.setTotalBookings(totalEarnings);
        report.setTotalEarnings(totalEarnings);
        report.setTotalRefund(totalRefund);
        report.setTotalBookings(totalBooking);
        return report;
    }
}
