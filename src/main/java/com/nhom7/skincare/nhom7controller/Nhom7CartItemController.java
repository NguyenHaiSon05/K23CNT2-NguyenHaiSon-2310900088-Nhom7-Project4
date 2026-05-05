package com.nhom7.skincare.nhom7controller;

import com.nhom7.skincare.nhom7entity.Nhom7CartItem;
import com.nhom7.skincare.nhom7service.Nhom7CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart-items")
public class Nhom7CartItemController {

    @Autowired
    private Nhom7CartItemService nhom7CartItemService;

    @GetMapping("/cart/{cartId}")
    public List<Nhom7CartItem> getCartItemsByCartId(@PathVariable Long cartId) {
        return nhom7CartItemService.getCartItemsByCartId(cartId);
    }

    @PostMapping
    public Nhom7CartItem addToCart(@RequestBody Nhom7CartItem cartItem) {
        return nhom7CartItemService.addToCart(cartItem);
    }

    @PutMapping("/{id}")
    public Nhom7CartItem updateCartItem(@PathVariable Long id,
                                        @RequestBody Nhom7CartItem cartItem) {
        return nhom7CartItemService.updateCartItem(id, cartItem);
    }

    @DeleteMapping("/{id}")
    public void deleteCartItem(@PathVariable Long id) {
        nhom7CartItemService.deleteCartItem(id);
    }
}