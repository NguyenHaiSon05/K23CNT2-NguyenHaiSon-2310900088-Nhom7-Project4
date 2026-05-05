package com.nhom7.skincare.nhom7controller;

import com.nhom7.skincare.nhom7entity.Nhom7Cart;
import com.nhom7.skincare.nhom7service.Nhom7CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/carts")
public class Nhom7CartController {

    @Autowired
    private Nhom7CartService nhom7CartService;

    @GetMapping("/user/{userId}")
    public Optional<Nhom7Cart> getCartByUserId(@PathVariable Long userId) {
        return nhom7CartService.getCartByUserId(userId);
    }

    @PostMapping
    public Nhom7Cart createCart(@RequestBody Nhom7Cart cart) {
        return nhom7CartService.createCart(cart);
    }
}