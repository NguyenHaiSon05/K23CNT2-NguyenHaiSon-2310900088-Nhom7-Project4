package com.nhom7.skincare.nhom7controller;

import com.nhom7.skincare.nhom7entity.Nhom7Review;
import com.nhom7.skincare.nhom7service.Nhom7ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reviews")
public class Nhom7ReviewController {

    @Autowired
    private Nhom7ReviewService nhom7ReviewService;

    @GetMapping
    public List<Nhom7Review> getAllReviews() {
        return nhom7ReviewService.getAllReviews();
    }

    @GetMapping("/{id}")
    public Optional<Nhom7Review> getReviewById(@PathVariable Long id) {
        return nhom7ReviewService.getReviewById(id);
    }

    @GetMapping("/product/{productId}")
    public List<Nhom7Review> getReviewsByProductId(@PathVariable Long productId) {
        return nhom7ReviewService.getReviewsByProductId(productId);
    }

    @GetMapping("/user/{userId}")
    public List<Nhom7Review> getReviewsByUserId(@PathVariable Long userId) {
        return nhom7ReviewService.getReviewsByUserId(userId);
    }

    @PostMapping
    public Nhom7Review createReview(@RequestBody Nhom7Review review) {
        return nhom7ReviewService.createReview(review);
    }

    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable Long id) {
        nhom7ReviewService.deleteReview(id);
    }
}