package com.nhom7.skincare.nhom7repository;

import com.nhom7.skincare.nhom7entity.Nhom7Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Nhom7OrderRepository extends JpaRepository<Nhom7Order, Long> {

    List<Nhom7Order> findByUserId(Long userId);

    List<Nhom7Order> findByOrderStatus(String orderStatus);
}