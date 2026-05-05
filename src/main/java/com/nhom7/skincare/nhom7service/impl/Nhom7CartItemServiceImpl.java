package com.nhom7.skincare.nhom7service.impl;

import com.nhom7.skincare.nhom7entity.Nhom7CartItem;
import com.nhom7.skincare.nhom7repository.Nhom7CartItemRepository;
import com.nhom7.skincare.nhom7service.Nhom7CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Nhom7CartItemServiceImpl implements Nhom7CartItemService {

    @Autowired
    private Nhom7CartItemRepository nhom7CartItemRepository;

    @Override
    public List<Nhom7CartItem> getCartItemsByCartId(Long cartId) {
        return nhom7CartItemRepository.findByCartId(cartId);
    }

    @Override
    public Nhom7CartItem addToCart(Nhom7CartItem cartItem) {
        return nhom7CartItemRepository.save(cartItem);
    }

    @Override
    public Nhom7CartItem updateCartItem(Long id, Nhom7CartItem cartItem) {
        Optional<Nhom7CartItem> existingCartItem =
                nhom7CartItemRepository.findById(id);

        if (existingCartItem.isPresent()) {
            Nhom7CartItem updatedCartItem = existingCartItem.get();
            updatedCartItem.setQuantity(cartItem.getQuantity());

            return nhom7CartItemRepository.save(updatedCartItem);
        }

        return null;
    }

    @Override
    public void deleteCartItem(Long id) {
        nhom7CartItemRepository.deleteById(id);
    }
}