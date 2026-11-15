package com.angel.mapper;

import com.angel.dto.BookingDTO;
import com.angel.dto.SalonDTO;
import com.angel.dto.ServiceDTO;
import com.angel.dto.UserDTO;
import com.angel.modal.Booking;

import java.util.List;
import java.util.Set;

public class BookingMapper {
    public static BookingDTO toDTO(Booking booking, Set<ServiceDTO> serviceDTOS, SalonDTO salonDTO, UserDTO userDTO){
        BookingDTO bookingDTO = new BookingDTO();
        bookingDTO.setId(booking.getId());
        bookingDTO.setCustomerId(booking.getCustomerId());
        bookingDTO.setStatus(booking.getStatus());
        bookingDTO.setEndTime(booking.getEndTime());
        bookingDTO.setStartTime(booking.getStartTime());
        bookingDTO.setSalonId(booking.getSalonId());
        bookingDTO.setServiceIds(booking.getServiceIds());
        bookingDTO.setTotalPrice(booking.getTotalPrice());
        bookingDTO.setSalonDTO(salonDTO);
        bookingDTO.setServiceDTOS(serviceDTOS);
        bookingDTO.setUserDTO(userDTO);
        return bookingDTO;
    }
}
