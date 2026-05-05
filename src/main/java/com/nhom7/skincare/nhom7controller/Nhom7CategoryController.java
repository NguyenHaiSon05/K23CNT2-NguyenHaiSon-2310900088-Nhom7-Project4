package com.nhom7.skincare.nhom7controller;

import com.nhom7.skincare.nhom7entity.Nhom7Category;
import com.nhom7.skincare.nhom7service.Nhom7CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categories")
public class Nhom7CategoryController {

    @Autowired
    private Nhom7CategoryService nhom7CategoryService;

    @GetMapping
    public List<Nhom7Category> getAllCategories() {
        return nhom7CategoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public Optional<Nhom7Category> getCategoryById(@PathVariable Long id) {
        return nhom7CategoryService.getCategoryById(id);
    }

    @PostMapping
    public Nhom7Category createCategory(@RequestBody Nhom7Category category) {
        return nhom7CategoryService.createCategory(category);
    }

    @PutMapping("/{id}")
    public Nhom7Category updateCategory(@PathVariable Long id,
                                        @RequestBody Nhom7Category category) {
        return nhom7CategoryService.updateCategory(id, category);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id) {
        nhom7CategoryService.deleteCategory(id);
    }
}