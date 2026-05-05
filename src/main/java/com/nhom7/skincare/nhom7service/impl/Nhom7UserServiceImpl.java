package com.nhom7.skincare.nhom7service.impl;

import com.nhom7.skincare.nhom7entity.Nhom7User;
import com.nhom7.skincare.nhom7repository.Nhom7UserRepository;
import com.nhom7.skincare.nhom7service.Nhom7UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Nhom7UserServiceImpl implements Nhom7UserService {

    @Autowired
    private Nhom7UserRepository nhom7UserRepository;

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
        return nhom7UserRepository.save(user);
    }

    @Override
    public Nhom7User updateUser(Long id, Nhom7User user) {
        Optional<Nhom7User> existingUser = nhom7UserRepository.findById(id);

        if (existingUser.isPresent()) {
            Nhom7User updatedUser = existingUser.get();
            updatedUser.setFullName(user.getFullName());
            updatedUser.setEmail(user.getEmail());
            updatedUser.setPhone(user.getPhone());
            updatedUser.setAddress(user.getAddress());

            return nhom7UserRepository.save(updatedUser);
        }

        return null;
    }

    @Override
    public void deleteUser(Long id) {
        nhom7UserRepository.deleteById(id);
    }
}