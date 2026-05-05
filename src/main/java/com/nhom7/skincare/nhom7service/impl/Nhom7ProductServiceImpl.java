package com.nhom7.skincare.nhom7service.impl;

import com.nhom7.skincare.nhom7entity.Nhom7Product;
import com.nhom7.skincare.nhom7exception.Nhom7ResourceNotFoundException;
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
        Nhom7Product existingProduct = nhom7ProductRepository.findById(id)
                .orElseThrow(() ->
                        new Nhom7ResourceNotFoundException(
                                "Product not found with id: " + id
                        ));

        existingProduct.setName(product.getName());
        existingProduct.setIngredients(product.getIngredients());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setStock(product.getStock());
        existingProduct.setImage(product.getImage());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setStatus(product.getStatus());
        existingProduct.setCategory(product.getCategory());
        existingProduct.setBrand(product.getBrand());

        return nhom7ProductRepository.save(existingProduct);
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