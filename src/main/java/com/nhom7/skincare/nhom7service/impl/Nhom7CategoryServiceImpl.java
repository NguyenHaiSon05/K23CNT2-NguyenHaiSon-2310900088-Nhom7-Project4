package com.nhom7.skincare.nhom7service.impl;

import com.nhom7.skincare.nhom7entity.Nhom7Category;
import com.nhom7.skincare.nhom7repository.Nhom7CategoryRepository;
import com.nhom7.skincare.nhom7service.Nhom7CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Nhom7CategoryServiceImpl implements Nhom7CategoryService {

    @Autowired
    private Nhom7CategoryRepository nhom7CategoryRepository;

    @Override
    public List<Nhom7Category> getAllCategories() {
        return nhom7CategoryRepository.findAll();
    }

    @Override
    public Optional<Nhom7Category> getCategoryById(Long id) {
        return nhom7CategoryRepository.findById(id);
    }

    @Override
    public Nhom7Category createCategory(Nhom7Category category) {
        return nhom7CategoryRepository.save(category);
    }

    @Override
    public Nhom7Category updateCategory(Long id, Nhom7Category category) {
        Optional<Nhom7Category> existingCategory = nhom7CategoryRepository.findById(id);

        if (existingCategory.isPresent()) {
            Nhom7Category updatedCategory = existingCategory.get();
            updatedCategory.setName(category.getName());
            updatedCategory.setDescription(category.getDescription());
            updatedCategory.setStatus(category.getStatus());

            return nhom7CategoryRepository.save(updatedCategory);
        }

        return null;
    }

    @Override
    public void deleteCategory(Long id) {
        nhom7CategoryRepository.deleteById(id);
    }
}