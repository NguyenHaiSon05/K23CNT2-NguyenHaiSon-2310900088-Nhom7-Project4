package com.nhom7.skincare.nhom7service;

import com.nhom7.skincare.nhom7entity.Nhom7Review;

import java.util.List;
import java.util.Optional;

public interface Nhom7ReviewService {

    List<Nhom7Review> getAllReviews();

    Optional<Nhom7Review> getReviewById(Long id);

    List<Nhom7Review> getReviewsByProductId(Long productId);

    List<Nhom7Review> getReviewsByUserId(Long userId);

    Nhom7Review createReview(Nhom7Review review);

    void deleteReview(Long id);
}