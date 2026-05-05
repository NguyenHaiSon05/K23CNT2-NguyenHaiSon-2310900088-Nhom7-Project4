package com.nhom7.skincare.nhom7service.impl;

import com.nhom7.skincare.nhom7entity.Nhom7Review;
import com.nhom7.skincare.nhom7repository.Nhom7ReviewRepository;
import com.nhom7.skincare.nhom7service.Nhom7ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Nhom7ReviewServiceImpl implements Nhom7ReviewService {

    @Autowired
    private Nhom7ReviewRepository nhom7ReviewRepository;

    @Override
    public List<Nhom7Review> getAllReviews() {
        return nhom7ReviewRepository.findAll();
    }

    @Override
    public Optional<Nhom7Review> getReviewById(Long id) {
        return nhom7ReviewRepository.findById(id);
    }

    @Override
    public List<Nhom7Review> getReviewsByProductId(Long productId) {
        return nhom7ReviewRepository.findByProductId(productId);
    }

    @Override
    public List<Nhom7Review> getReviewsByUserId(Long userId) {
        return nhom7ReviewRepository.findByUserId(userId);
    }

    @Override
    public Nhom7Review createReview(Nhom7Review review) {
        return nhom7ReviewRepository.save(review);
    }

    @Override
    public void deleteReview(Long id) {
        nhom7ReviewRepository.deleteById(id);
    }
}