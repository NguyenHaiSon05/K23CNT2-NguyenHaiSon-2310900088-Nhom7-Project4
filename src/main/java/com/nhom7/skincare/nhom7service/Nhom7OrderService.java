package com.nhom7.skincare.nhom7service;

import com.nhom7.skincare.nhom7entity.Nhom7Order;

import java.util.List;
import java.util.Optional;

public interface Nhom7OrderService {

    List<Nhom7Order> getAllOrders();

    Optional<Nhom7Order> getOrderById(Long id);

    List<Nhom7Order> getOrdersByUserId(Long userId);

    List<Nhom7Order> getOrdersByStatus(String status);

    Nhom7Order createOrder(Nhom7Order order);

    Nhom7Order updateOrder(Long id, Nhom7Order order);

    void deleteOrder(Long id);
}