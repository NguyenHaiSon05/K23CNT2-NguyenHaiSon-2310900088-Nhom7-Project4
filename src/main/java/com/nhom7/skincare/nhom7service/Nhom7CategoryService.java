package com.nhom7.skincare.nhom7service;

import com.nhom7.skincare.nhom7entity.Nhom7Category;

import java.util.List;
import java.util.Optional;

public interface Nhom7CategoryService {

    List<Nhom7Category> getAllCategories();

    Optional<Nhom7Category> getCategoryById(Long id);

    Nhom7Category createCategory(Nhom7Category category);

    Nhom7Category updateCategory(Long id, Nhom7Category category);

    void deleteCategory(Long id);
}