package com.angel.controller;

import com.angel.dto.CategoryDTO;
import com.angel.dto.SalonDTO;
import com.angel.dto.ServiceDTO;
import com.angel.modal.ServiceOffering;
import com.angel.service.ServiceOfferingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/service-offering/salon-owner")
public class SalonServiceOfferingController {//4:57:42
    private final ServiceOfferingService serviceOfferingService;

    @PostMapping
    public ResponseEntity<ServiceOffering> createService(
            @RequestBody ServiceDTO serviceDTO
    ){
        SalonDTO salonDTO = new SalonDTO();
        salonDTO.setId(1L);
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(serviceDTO.getCategoryId());
        ServiceOffering serviceOfferings = serviceOfferingService.
        createService(salonDTO,serviceDTO,categoryDTO);
        return ResponseEntity.ok(serviceOfferings);
    }

    @PostMapping("/{id}")
    public ResponseEntity<ServiceOffering> updateService(
            @PathVariable Long id,
            @RequestBody ServiceOffering serviceOffering
    ) throws Exception {
        ServiceOffering serviceOfferings = serviceOfferingService.
                updateService(id,serviceOffering);
        return ResponseEntity.ok(serviceOfferings);
    }
}
