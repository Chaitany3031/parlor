package com.angel.controller;

import com.angel.mapper.SalonMapper;
import com.angel.modal.Salon;
import com.angel.payload.dto.SalonDTO;
import com.angel.payload.dto.UserDTO;
import com.angel.service.SalonService;
import com.angel.service.UserService;
import com.angel.service.client.UserFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salons")
@RequiredArgsConstructor
public class SalonController {
    private final SalonService salonService;
    private final UserService userService;
    private final UserFeignClient userFeignClient;

    @PostMapping
    public ResponseEntity<SalonDTO> createSalon(
            @RequestBody SalonDTO salonDTO,
            @RequestHeader(value = "Authorization", required = false) String jwt
    ) throws Exception {
//        UserDTO userDTO = userService.getUserProfile(jwt);
        UserDTO userDTO = userFeignClient.getUserProfile(jwt).getBody();

        if (userDTO == null) {
            userDTO = new UserDTO();
            userDTO.setId(1L);
        }
        if (salonDTO.getEmail() == null || salonDTO.getEmail().isBlank()) {
            salonDTO.setEmail(userDTO.getEmail());
        }
        Salon salon = salonService.createSalon(salonDTO, userDTO);
        SalonDTO salonDTO1 = SalonMapper.mapToDTO(salon);
        return ResponseEntity.ok(salonDTO1);
    }

    @PutMapping("/{salonId}")
    public ResponseEntity<SalonDTO> updateSalon(
            @PathVariable Long salonId,
            @RequestBody SalonDTO salonDTO,
            @RequestHeader(value = "Authorization", required = false) String jwt
    ) throws Exception {
//        UserDTO userDTO = userService.getUserProfile(jwt);
        UserDTO userDTO = userFeignClient.getUserProfile(jwt).getBody();
        if (userDTO == null) {
            userDTO = new UserDTO();
            userDTO.setId(1L);
        }

        System.out.println("--------------"+salonId);

        Salon salon = salonService.updateSalon(salonDTO, userDTO, salonId);
        SalonDTO salonDTO1 = SalonMapper.mapToDTO(salon);
        return ResponseEntity.ok(salonDTO1);
    }

    @GetMapping()
    public ResponseEntity<List<SalonDTO>> getSalons() throws Exception {
        List<Salon> salons = salonService.getAllSalons();
        List<SalonDTO> salonDTOs = salons.stream().map(SalonMapper::mapToDTO).toList();
        return ResponseEntity.ok(salonDTOs);
    }

    @GetMapping("/{salonId}")
    public ResponseEntity<List<SalonDTO>> getSalonById(
            @PathVariable Long salonId,
            @RequestHeader(value = "Authorization", required = false) String jwt
    ) throws Exception {
        Salon salon = salonService.getSalonById(salonId);
        SalonDTO salonDTO = SalonMapper.mapToDTO(salon);

        if (jwt != null && !jwt.isBlank()) {
            UserDTO userDTO = userService.getUserProfile(jwt);
            if (userDTO != null) {
                if (userDTO.getId() != null) {
                    salonDTO.setOwnerId(userDTO.getId());
                }
                if (userDTO.getEmail() != null && !userDTO.getEmail().isBlank()) {
                    salonDTO.setEmail(userDTO.getEmail());
                }
            }
        }
        return ResponseEntity.ok(List.of(salonDTO));
    }

    @GetMapping("/search")
    public ResponseEntity<List<SalonDTO>> searchSalons(
            @RequestParam("city") String city
    ) throws Exception {
        List<Salon> salons = salonService.searchSalonByCity(city);
        List<SalonDTO> salonDTOs = salons.stream().map(SalonMapper::mapToDTO).toList();
        return ResponseEntity.ok(salonDTOs);
    }

    @GetMapping("/owner")
    public ResponseEntity<SalonDTO> getSalonByOwnerId(
            @RequestHeader(value = "Authorization", required = false) String jwt
    ) throws Exception {
//        UserDTO userDTO = userService.getUserProfile(jwt);
        UserDTO userDTO = userFeignClient.getUserProfile(jwt).getBody();
        if (userDTO == null) {
            userDTO = new UserDTO();
            userDTO.setId(1L);
            throw new Exception("user not found from jwt..");
        }
        Salon salon = salonService.getSalonByOwnerId(userDTO.getId());
        if (salon == null) {
            salon = salonService.getAllSalons().stream().findFirst().orElse(null);
        }
        SalonDTO salonDTO = salon != null ? SalonMapper.mapToDTO(salon) : new SalonDTO();
        if (userDTO.getId() != null) {
            salonDTO.setOwnerId(userDTO.getId());
        }
        if (userDTO.getEmail() != null && !userDTO.getEmail().isBlank()) {
            salonDTO.setEmail(userDTO.getEmail());
        }
        return ResponseEntity.ok(salonDTO);
    }

}
