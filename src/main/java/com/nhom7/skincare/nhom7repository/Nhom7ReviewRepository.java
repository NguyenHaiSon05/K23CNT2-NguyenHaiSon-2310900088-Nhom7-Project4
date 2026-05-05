package com.nhom7.skincare.nhom7repository;

import com.nhom7.skincare.nhom7entity.Nhom7Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Nhom7ReviewRepository extends JpaRepository<Nhom7Review, Long> {

    List<Nhom7Review> findByProductId(Long productId);

    List<Nhom7Review> findByUserId(Long userId);
}