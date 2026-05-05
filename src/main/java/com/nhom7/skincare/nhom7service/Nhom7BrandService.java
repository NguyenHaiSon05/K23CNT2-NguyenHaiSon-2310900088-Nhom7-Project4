package com.nhom7.skincare.nhom7service;

import com.nhom7.skincare.nhom7entity.Nhom7Brand;

import java.util.List;
import java.util.Optional;

public interface Nhom7BrandService {

    List<Nhom7Brand> getAllBrands();

    Optional<Nhom7Brand> getBrandById(Long id);

    Nhom7Brand createBrand(Nhom7Brand brand);

    Nhom7Brand updateBrand(Long id, Nhom7Brand brand);

    void deleteBrand(Long id);
}