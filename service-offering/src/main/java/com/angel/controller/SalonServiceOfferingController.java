package com.angel.controller;

import com.angel.dto.CategoryDTO;
import com.angel.dto.SalonDTO;
import com.angel.dto.ServiceDTO;
import com.angel.modal.ServiceOffering;
import com.angel.service.ServiceOfferingService;
import com.angel.service.client.CategoryFeignClient;
import com.angel.service.client.SalonFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/service-offering/salon-owner")
public class SalonServiceOfferingController {
    private final ServiceOfferingService serviceOfferingService;
    private final SalonFeignClient salonFeignClient;
    private final CategoryFeignClient categoryFeignClient;

    @PostMapping
    public ResponseEntity<ServiceOffering> createService(
            @RequestBody ServiceDTO serviceDTO,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        SalonDTO salonDTO = salonFeignClient.getSalonByOwnerId(jwt).getBody();

        CategoryDTO categoryDTO = categoryFeignClient.getCategoriesByIdAndSalon(serviceDTO.getCategoryId(),salonDTO.getId()).getBody();

        ServiceOffering serviceOfferings = serviceOfferingService.createService(salonDTO,serviceDTO,categoryDTO);
        return ResponseEntity.ok(serviceOfferings);
    }

    @PostMapping("/{id}")
    public ResponseEntity<ServiceOffering> updateService(
            @PathVariable Long id,
            @RequestBody ServiceOffering serviceOffering
    ) throws Exception {

        ServiceOffering serviceOfferings = serviceOfferingService.updateService(id,serviceOffering);
        return ResponseEntity.ok(serviceOfferings);
    }

}
