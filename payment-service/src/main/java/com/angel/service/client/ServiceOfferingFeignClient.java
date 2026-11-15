package com.angel.service.client;

import com.angel.dto.ServiceDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Set;

@FeignClient("SERVICE-OFFERING")
public interface ServiceOfferingFeignClient {
    @GetMapping("/api/service-offering/list/{ids}")
    public ResponseEntity<Set<ServiceDTO>> getServicesById(
            @PathVariable Set<Long> ids
    );
}
