package com.nhom7.skincare.nhom7service.impl;

import com.nhom7.skincare.nhom7entity.Nhom7User;
import com.nhom7.skincare.nhom7exception.Nhom7ResourceNotFoundException;
import com.nhom7.skincare.nhom7repository.Nhom7UserRepository;
import com.nhom7.skincare.nhom7service.Nhom7UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

@Service
public class Nhom7UserServiceImpl implements Nhom7UserService {

    @Autowired
    private Nhom7UserRepository nhom7UserRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<Nhom7User> getAllUsers() {
        return nhom7UserRepository.findAll();
    }

    @Override
    public Optional<Nhom7User> getUserById(Long id) {
        return nhom7UserRepository.findById(id);
    }

    @Override
    public Nhom7User createUser(Nhom7User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return nhom7UserRepository.save(user);
    }

    @Override
    public Nhom7User updateUser(Long id, Nhom7User user) {
        Nhom7User existingUser = nhom7UserRepository.findById(id)
                .orElseThrow(() ->
                        new Nhom7ResourceNotFoundException(
                                "User not found with id: " + id
                        ));

        existingUser.setFullName(user.getFullName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPhone(user.getPhone());
        existingUser.setAddress(user.getAddress());

        return nhom7UserRepository.save(existingUser);
    }

    @Override
    public void deleteUser(Long id) {
        nhom7UserRepository.deleteById(id);
    }
}