package com.nhom7.skincare.nhom7repository;

import com.nhom7.skincare.nhom7entity.Nhom7Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Nhom7ProductRepository extends JpaRepository<Nhom7Product, Long> {

    List<Nhom7Product> findByNameContaining(String keyword);

    List<Nhom7Product> findByCategoryId(Long categoryId);

    List<Nhom7Product> findByBrandId(Long brandId);
}