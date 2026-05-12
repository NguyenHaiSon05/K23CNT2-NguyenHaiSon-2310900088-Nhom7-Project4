package com.nhom7.skincare.nhom7config;

import com.nhom7.skincare.nhom7entity.Nhom7Brand;
import com.nhom7.skincare.nhom7entity.Nhom7Category;
import com.nhom7.skincare.nhom7entity.Nhom7Product;
import com.nhom7.skincare.nhom7repository.Nhom7BrandRepository;
import com.nhom7.skincare.nhom7repository.Nhom7CategoryRepository;
import com.nhom7.skincare.nhom7repository.Nhom7ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class Nhom7DataSeeder implements CommandLineRunner {

    private final Nhom7CategoryRepository nhom7CategoryRepository;
    private final Nhom7BrandRepository nhom7BrandRepository;
    private final Nhom7ProductRepository nhom7ProductRepository;

    public Nhom7DataSeeder(
            Nhom7CategoryRepository nhom7CategoryRepository,
            Nhom7BrandRepository nhom7BrandRepository,
            Nhom7ProductRepository nhom7ProductRepository) {
        this.nhom7CategoryRepository = nhom7CategoryRepository;
        this.nhom7BrandRepository = nhom7BrandRepository;
        this.nhom7ProductRepository = nhom7ProductRepository;
    }

    @Override
    public void run(String... args) {

        if (nhom7CategoryRepository.count() == 0) {

            Nhom7Category cleanser =
                    Nhom7Category.builder()
                            .name("Cleanser")
                            .status(true)
                            .build();

            nhom7CategoryRepository.save(cleanser);

            Nhom7Brand cerave =
                    Nhom7Brand.builder()
                            .name("Cerave")
                            .logo("products/cerave.png")
                            .status(true)
                            .build();

            nhom7BrandRepository.save(cerave);

            Nhom7Product product =
                    Nhom7Product.builder()
                            .name("Cerave Foaming Cleanser")
                            .ingredients("Ceramide, Niacinamide")
                            .price(new BigDecimal("250000"))
                            .stock(50)
                            .image("products/cerave.png")
                            .description("Cleanser for oily skin")
                            .status(true)
                            .category(cleanser)
                            .brand(cerave)
                            .build();

            nhom7ProductRepository.save(product);
        }
    }
}