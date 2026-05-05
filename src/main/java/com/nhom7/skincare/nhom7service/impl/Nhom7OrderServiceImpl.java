package com.nhom7.skincare.nhom7service.impl;

import com.nhom7.skincare.nhom7entity.Nhom7Order;
import com.nhom7.skincare.nhom7exception.Nhom7ResourceNotFoundException;
import com.nhom7.skincare.nhom7repository.Nhom7OrderRepository;
import com.nhom7.skincare.nhom7service.Nhom7OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Nhom7OrderServiceImpl implements Nhom7OrderService {

    @Autowired
    private Nhom7OrderRepository nhom7OrderRepository;

    @Override
    public List<Nhom7Order> getAllOrders() {
        return nhom7OrderRepository.findAll();
    }

    @Override
    public Optional<Nhom7Order> getOrderById(Long id) {
        return nhom7OrderRepository.findById(id);
    }

    @Override
    public List<Nhom7Order> getOrdersByUserId(Long userId) {
        return nhom7OrderRepository.findByUserId(userId);
    }

    @Override
    public List<Nhom7Order> getOrdersByStatus(String status) {
        return nhom7OrderRepository.findByOrderStatus(status);
    }

    @Override
    public Nhom7Order createOrder(Nhom7Order order) {
        return nhom7OrderRepository.save(order);
    }

    @Override
    public Nhom7Order updateOrder(Long id, Nhom7Order order) {
        Nhom7Order existingOrder = nhom7OrderRepository.findById(id)
                .orElseThrow(() ->
                        new Nhom7ResourceNotFoundException(
                                "Order not found with id: " + id
                        ));

        existingOrder.setVoucher(order.getVoucher());
        existingOrder.setOrderDate(order.getOrderDate());
        existingOrder.setTotalAmount(order.getTotalAmount());
        existingOrder.setOrderStatus(order.getOrderStatus());
        existingOrder.setShippingAddress(order.getShippingAddress());
        existingOrder.setPaymentMethod(order.getPaymentMethod());

        return nhom7OrderRepository.save(existingOrder);
    }

    @Override
    public void deleteOrder(Long id) {
        nhom7OrderRepository.deleteById(id);
    }
}