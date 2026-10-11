package com.angel.service;

import com.angel.dto.CategoryDTO;
import com.angel.dto.SalonDTO;
import com.angel.dto.ServiceDTO;
import com.angel.modal.ServiceOffering;

import java.util.Set;

public interface ServiceOfferingService {
    ServiceOffering createService(SalonDTO salonDTO, ServiceDTO serviceDTO , CategoryDTO categoryDTO);
    ServiceOffering updateService(Long serviceId, ServiceOffering service) throws Exception;
    Set<ServiceOffering> getAllServiceBySalonId(Long salonId, Long categoryId);
    Set<ServiceOffering> getServicesByIds(Set<Long> ids);
    ServiceOffering getServiceById(Long id) throws Exception;
}
