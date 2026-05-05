package com.nhom7.skincare.nhom7repository;

import com.nhom7.skincare.nhom7entity.Nhom7Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface Nhom7CartRepository extends JpaRepository<Nhom7Cart, Long> {

    Optional<Nhom7Cart> findByUserId(Long userId);
}