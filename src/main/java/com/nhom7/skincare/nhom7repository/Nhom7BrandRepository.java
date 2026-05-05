package com.nhom7.skincare.nhom7repository;

import com.nhom7.skincare.nhom7entity.Nhom7Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface Nhom7BrandRepository extends JpaRepository<Nhom7Brand, Long> {

    Optional<Nhom7Brand> findByName(String name);

    boolean existsByName(String name);
}