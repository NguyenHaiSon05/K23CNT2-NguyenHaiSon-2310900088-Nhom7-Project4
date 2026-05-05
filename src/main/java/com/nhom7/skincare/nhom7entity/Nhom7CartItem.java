package com.nhom7.skincare.nhom7entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "nhom7_cart_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Nhom7CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Nhom7Cart cart;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Nhom7Product product;

    private Integer quantity;
}