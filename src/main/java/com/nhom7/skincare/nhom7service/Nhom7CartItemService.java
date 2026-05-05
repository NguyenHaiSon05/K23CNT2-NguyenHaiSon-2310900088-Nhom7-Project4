package com.nhom7.skincare.nhom7service;

import com.nhom7.skincare.nhom7entity.Nhom7CartItem;

import java.util.List;

public interface Nhom7CartItemService {

    List<Nhom7CartItem> getCartItemsByCartId(Long cartId);

    Nhom7CartItem addToCart(Nhom7CartItem cartItem);

    Nhom7CartItem updateCartItem(Long id, Nhom7CartItem cartItem);

    void deleteCartItem(Long id);
}