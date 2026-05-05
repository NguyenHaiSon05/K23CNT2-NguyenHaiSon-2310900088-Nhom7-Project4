package com.nhom7.skincare.nhom7controller;

import com.nhom7.skincare.nhom7entity.Nhom7Brand;
import com.nhom7.skincare.nhom7service.Nhom7BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/brands")
public class Nhom7BrandController {

    @Autowired
    private Nhom7BrandService nhom7BrandService;

    @GetMapping
    public List<Nhom7Brand> getAllBrands() {
        return nhom7BrandService.getAllBrands();
    }

    @GetMapping("/{id}")
    public Optional<Nhom7Brand> getBrandById(@PathVariable Long id) {
        return nhom7BrandService.getBrandById(id);
    }

    @PostMapping
    public Nhom7Brand createBrand(@RequestBody Nhom7Brand brand) {
        return nhom7BrandService.createBrand(brand);
    }

    @PutMapping("/{id}")
    public Nhom7Brand updateBrand(@PathVariable Long id,
                                  @RequestBody Nhom7Brand brand) {
        return nhom7BrandService.updateBrand(id, brand);
    }

    @DeleteMapping("/{id}")
    public void deleteBrand(@PathVariable Long id) {
        nhom7BrandService.deleteBrand(id);
    }
}