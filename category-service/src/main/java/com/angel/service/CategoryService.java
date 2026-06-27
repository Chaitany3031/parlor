package com.angel.service;

import com.angel.dto.SalonDTO;
import com.angel.modal.Category;

import java.util.Set;

public interface CategoryService {
    Category saveCategory(Category category, SalonDTO salonDTO);
    Set<Category> getAllCategoriesBySalon(Long id);
    Category getCategoryById(Long id) throws Exception;
    void deleteCategoryById(Long id,Long salonId) throws Exception;
}
