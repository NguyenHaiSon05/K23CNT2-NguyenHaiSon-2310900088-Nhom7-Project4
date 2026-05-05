package com.nhom7.skincare.nhom7service.impl;

import com.nhom7.skincare.nhom7entity.Nhom7Product;
import com.nhom7.skincare.nhom7repository.Nhom7ProductRepository;
import com.nhom7.skincare.nhom7service.Nhom7ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Nhom7ProductServiceImpl implements Nhom7ProductService {

    @Autowired
    private Nhom7ProductRepository nhom7ProductRepository;

    @Override
    public List<Nhom7Product> getAllProducts() {
        return nhom7ProductRepository.findAll();
    }

    @Override
    public Optional<Nhom7Product> getProductById(Long id) {
        return nhom7ProductRepository.findById(id);
    }

    @Override
    public Nhom7Product createProduct(Nhom7Product product) {
        return nhom7ProductRepository.save(product);
    }

    @Override
    public Nhom7Product updateProduct(Long id, Nhom7Product product) {
        Optional<Nhom7Product> existingProduct = nhom7ProductRepository.findById(id);

        if (existingProduct.isPresent()) {
            Nhom7Product updatedProduct = existingProduct.get();
            updatedProduct.setName(product.getName());
            updatedProduct.setIngredients(product.getIngredients());
            updatedProduct.setPrice(product.getPrice());
            updatedProduct.setStock(product.getStock());
            updatedProduct.setImage(product.getImage());
            updatedProduct.setDescription(product.getDescription());
            updatedProduct.setStatus(product.getStatus());
            updatedProduct.setCategory(product.getCategory());
            updatedProduct.setBrand(product.getBrand());

            return nhom7ProductRepository.save(updatedProduct);
        }

        return null;
    }

    @Override
    public void deleteProduct(Long id) {
        nhom7ProductRepository.deleteById(id);
    }

    @Override
    public List<Nhom7Product> searchProducts(String keyword) {
        return nhom7ProductRepository.findByNameContaining(keyword);
    }

    @Override
    public List<Nhom7Product> getProductsByCategory(Long categoryId) {
        return nhom7ProductRepository.findByCategoryId(categoryId);
    }

    @Override
    public List<Nhom7Product> getProductsByBrand(Long brandId) {
        return nhom7ProductRepository.findByBrandId(brandId);
    }
}