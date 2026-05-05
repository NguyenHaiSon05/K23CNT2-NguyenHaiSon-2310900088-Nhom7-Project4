package com.nhom7.skincare.nhom7service;

import com.nhom7.skincare.nhom7entity.Nhom7Cart;

import java.util.Optional;

public interface Nhom7CartService {

    Optional<Nhom7Cart> getCartByUserId(Long userId);

    Nhom7Cart createCart(Nhom7Cart cart);
}