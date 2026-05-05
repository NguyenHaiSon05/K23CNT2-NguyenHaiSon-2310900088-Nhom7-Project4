package com.nhom7.skincare.nhom7service;

import com.nhom7.skincare.nhom7entity.Nhom7Product;

import java.util.List;
import java.util.Optional;

public interface Nhom7ProductService {

    List<Nhom7Product> getAllProducts();

    Optional<Nhom7Product> getProductById(Long id);

    Nhom7Product createProduct(Nhom7Product product);

    Nhom7Product updateProduct(Long id, Nhom7Product product);

    void deleteProduct(Long id);

    List<Nhom7Product> searchProducts(String keyword);

    List<Nhom7Product> getProductsByCategory(Long categoryId);

    List<Nhom7Product> getProductsByBrand(Long brandId);
}