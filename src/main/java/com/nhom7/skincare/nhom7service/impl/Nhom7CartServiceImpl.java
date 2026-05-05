package com.nhom7.skincare.nhom7service.impl;

import com.nhom7.skincare.nhom7entity.Nhom7Cart;
import com.nhom7.skincare.nhom7repository.Nhom7CartRepository;
import com.nhom7.skincare.nhom7service.Nhom7CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class Nhom7CartServiceImpl implements Nhom7CartService {

    @Autowired
    private Nhom7CartRepository nhom7CartRepository;

    @Override
    public Optional<Nhom7Cart> getCartByUserId(Long userId) {
        return nhom7CartRepository.findByUserId(userId);
    }

    @Override
    public Nhom7Cart createCart(Nhom7Cart cart) {
        return nhom7CartRepository.save(cart);
    }
}