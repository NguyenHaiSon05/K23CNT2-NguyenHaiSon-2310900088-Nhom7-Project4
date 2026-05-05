package com.nhom7.skincare.nhom7repository;

import com.nhom7.skincare.nhom7entity.Nhom7OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Nhom7OrderDetailRepository extends JpaRepository<Nhom7OrderDetail, Long> {

    List<Nhom7OrderDetail> findByOrderId(Long orderId);
}