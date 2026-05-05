package com.nhom7.skincare.nhom7entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "nhom7_products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Nhom7Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Nhom7Category category;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Nhom7Brand brand;

    @Column(nullable = false)
    private String name;

    private String ingredients;

    @Column(nullable = false)
    private BigDecimal price;

    private Integer stock;

    private String image;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Boolean status = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}