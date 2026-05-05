package com.nhom7.skincare.nhom7repository;

import com.nhom7.skincare.nhom7entity.Nhom7Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface Nhom7CategoryRepository extends JpaRepository<Nhom7Category, Long> {

    Optional<Nhom7Category> findByName(String name);

    boolean existsByName(String name);
}