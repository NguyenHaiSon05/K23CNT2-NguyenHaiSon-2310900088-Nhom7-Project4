package com.nhom7.skincare.nhom7entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "nhom7_brands")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Nhom7Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String logo;

    private Boolean status = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}