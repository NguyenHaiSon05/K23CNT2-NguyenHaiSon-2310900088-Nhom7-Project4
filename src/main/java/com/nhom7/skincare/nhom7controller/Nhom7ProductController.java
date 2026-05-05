package com.nhom7.skincare.nhom7controller;

import com.nhom7.skincare.nhom7entity.Nhom7Product;
import com.nhom7.skincare.nhom7service.Nhom7ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class Nhom7ProductController {

    @Autowired
    private Nhom7ProductService nhom7ProductService;

    @GetMapping
    public List<Nhom7Product> getAllProducts() {
        return nhom7ProductService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Optional<Nhom7Product> getProductById(@PathVariable Long id) {
        return nhom7ProductService.getProductById(id);
    }

    @PostMapping
    public Nhom7Product createProduct(@RequestBody Nhom7Product product) {
        return nhom7ProductService.createProduct(product);
    }

    @PutMapping("/{id}")
    public Nhom7Product updateProduct(@PathVariable Long id,
                                      @RequestBody Nhom7Product product) {
        return nhom7ProductService.updateProduct(id, product);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        nhom7ProductService.deleteProduct(id);
    }

    @GetMapping("/search")
    public List<Nhom7Product> searchProducts(@RequestParam String keyword) {
        return nhom7ProductService.searchProducts(keyword);
    }

    @GetMapping("/category/{categoryId}")
    public List<Nhom7Product> getProductsByCategory(@PathVariable Long categoryId) {
        return nhom7ProductService.getProductsByCategory(categoryId);
    }

    @GetMapping("/brand/{brandId}")
    public List<Nhom7Product> getProductsByBrand(@PathVariable Long brandId) {
        return nhom7ProductService.getProductsByBrand(brandId);
    }
}