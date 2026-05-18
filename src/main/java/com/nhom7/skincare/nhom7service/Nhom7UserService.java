package com.nhom7.skincare.nhom7service;

import com.nhom7.skincare.nhom7entity.Nhom7User;

import java.util.List;
import java.util.Optional;

public interface Nhom7UserService {

    List<Nhom7User> getAllUsers();

    Optional<Nhom7User> getUserById(Long id);

    Nhom7User createUser(Nhom7User user);

    Nhom7User updateUser(Long id, Nhom7User user);

    void deleteUser(Long id);

    Nhom7User login(String email, String password);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}