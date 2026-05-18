package com.nhom7.skincare.nhom7repository;

import com.nhom7.skincare.nhom7entity.Nhom7User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface Nhom7UserRepository extends JpaRepository<Nhom7User, Long> {

    Optional<Nhom7User> findByUsername(String username);


    Optional<Nhom7User> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}