package com.angel.controller;

import com.angel.mapper.SalonMapper;
import com.angel.modal.Salon;
import com.angel.payload.dto.SalonDTO;
import com.angel.payload.dto.UserDTO;
import com.angel.service.SalonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salons")
@RequiredArgsConstructor
public class SalonController {
    private final SalonService salonService;
    @PostMapping
    public ResponseEntity<SalonDTO> createSalon(@RequestBody SalonDTO salonDTO){
        UserDTO userDTO = new UserDTO();
        userDTO.setId(1L);
        Salon salon = salonService.createSalon(salonDTO,userDTO);
        SalonDTO salonDTO1 = SalonMapper.mapToDTO(salon);
        return ResponseEntity.ok(salonDTO1);
    }

    @PutMapping("/{salonId}")
    public ResponseEntity<SalonDTO> updateSalon(
            @PathVariable Long salonId,
            @RequestBody SalonDTO salonDTO) throws Exception {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(1L);

        System.out.println("--------------"+salonId);

        Salon salon = salonService.updateSalon(salonDTO,userDTO,salonId);
        SalonDTO salonDTO1 = SalonMapper.mapToDTO(salon);
        return ResponseEntity.ok(salonDTO1);
    }

    @GetMapping()
    public ResponseEntity<List<SalonDTO>> getSalons() throws Exception {
        List<Salon> salons = salonService.getAllSalons();
        List<SalonDTO> salonDTOs = salons.stream().map((salon)->
                {
                    SalonDTO salonDTO = SalonMapper.mapToDTO(salon);
                    return salonDTO;
                }
        ).toList();
        return ResponseEntity.ok(salonDTOs);
    }

    @GetMapping("/{salonId}")
    public ResponseEntity<SalonDTO> getSalonById(
            @PathVariable Long salonId
    ) throws Exception {
        Salon salon = salonService.getSalonById(salonId);
        SalonDTO salonDTO = SalonMapper.mapToDTO(salon);
        return ResponseEntity.ok(salonDTO);
    }

    @GetMapping("/search")
    public ResponseEntity<List<SalonDTO>> searchSalons(
            @RequestParam("city") String city
    ) throws Exception {
        List<Salon> salons = salonService.searchSalonByCity(city);
        List<SalonDTO> salonDTOs = salons.stream().map((salon)->
                {
                    SalonDTO salonDTO = SalonMapper.mapToDTO(salon);
                    return salonDTO;
                }
        ).toList();
        return ResponseEntity.ok(salonDTOs);
    }

    @GetMapping("/owner")
    public ResponseEntity<SalonDTO> getSalonByOwnerId(
            @PathVariable Long salonId
    ) throws Exception {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(1L);
        Salon salon = salonService.getSalonByOwnerId(userDTO.getId());
        SalonDTO salonDTO = SalonMapper.mapToDTO(salon);
        return ResponseEntity.ok(salonDTO);
    }

}
