package com.nhom7.skincare.nhom7service.impl;

import com.nhom7.skincare.nhom7entity.Nhom7Brand;
import com.nhom7.skincare.nhom7repository.Nhom7BrandRepository;
import com.nhom7.skincare.nhom7service.Nhom7BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Nhom7BrandServiceImpl implements Nhom7BrandService {

    @Autowired
    private Nhom7BrandRepository nhom7BrandRepository;

    @Override
    public List<Nhom7Brand> getAllBrands() {
        return nhom7BrandRepository.findAll();
    }

    @Override
    public Optional<Nhom7Brand> getBrandById(Long id) {
        return nhom7BrandRepository.findById(id);
    }

    @Override
    public Nhom7Brand createBrand(Nhom7Brand brand) {
        return nhom7BrandRepository.save(brand);
    }

    @Override
    public Nhom7Brand updateBrand(Long id, Nhom7Brand brand) {
        Optional<Nhom7Brand> existingBrand = nhom7BrandRepository.findById(id);

        if (existingBrand.isPresent()) {
            Nhom7Brand updatedBrand = existingBrand.get();
            updatedBrand.setName(brand.getName());
            updatedBrand.setLogo(brand.getLogo());
            updatedBrand.setStatus(brand.getStatus());

            return nhom7BrandRepository.save(updatedBrand);
        }

        return null;
    }

    @Override
    public void deleteBrand(Long id) {
        nhom7BrandRepository.deleteById(id);
    }
}