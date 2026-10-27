package com.angel.service.client;

import com.angel.dto.SalonDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient("SALON-SERVICE")
public interface SalonFeignClient {

    @GetMapping("/api/salons/owner")
    public ResponseEntity<SalonDTO> getSalonByOwnerId(
            @RequestHeader("Authorization") String jwt
    ) throws Exception;

    @GetMapping("/api/salons/{salonId}")
    public ResponseEntity<List<SalonDTO>> getSalonById(
            @PathVariable Long salonId
//            @RequestHeader(value = "Authorization", required = false) String jwt
    ) throws Exception;
}
