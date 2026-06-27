package com.angel.repository;

import com.angel.modal.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface CategoryRepository extends JpaRepository<Category,Long> {
    Set<Category> findBySalonId(Long salonId);

}
