package com.nhom7.skincare.nhom7controller;

import com.nhom7.skincare.nhom7entity.Nhom7Order;
import com.nhom7.skincare.nhom7service.Nhom7OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class Nhom7OrderController {

    @Autowired
    private Nhom7OrderService nhom7OrderService;

    @GetMapping
    public List<Nhom7Order> getAllOrders() {
        return nhom7OrderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public Optional<Nhom7Order> getOrderById(@PathVariable Long id) {
        return nhom7OrderService.getOrderById(id);
    }

    @GetMapping("/user/{userId}")
    public List<Nhom7Order> getOrdersByUserId(@PathVariable Long userId) {
        return nhom7OrderService.getOrdersByUserId(userId);
    }

    @GetMapping("/status/{status}")
    public List<Nhom7Order> getOrdersByStatus(@PathVariable String status) {
        return nhom7OrderService.getOrdersByStatus(status);
    }

    @PostMapping
    public Nhom7Order createOrder(@RequestBody Nhom7Order order) {
        return nhom7OrderService.createOrder(order);
    }

    @PutMapping("/{id}")
    public Nhom7Order updateOrder(@PathVariable Long id,
                                  @RequestBody Nhom7Order order) {
        return nhom7OrderService.updateOrder(id, order);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        nhom7OrderService.deleteOrder(id);
    }
}