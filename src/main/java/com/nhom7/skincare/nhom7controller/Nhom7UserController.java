package com.nhom7.skincare.nhom7controller;

import com.nhom7.skincare.nhom7entity.Nhom7User;
import com.nhom7.skincare.nhom7service.Nhom7UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class Nhom7UserController {

    @Autowired
    private Nhom7UserService nhom7UserService;

    @GetMapping
    public List<Nhom7User> getAllUsers() {
        return nhom7UserService.getAllUsers();
    }

    @GetMapping("/{id}")
    public Optional<Nhom7User> getUserById(@PathVariable Long id) {
        return nhom7UserService.getUserById(id);
    }

    @PostMapping
    public Nhom7User createUser(@RequestBody Nhom7User user) {
        return nhom7UserService.createUser(user);
    }

    @PutMapping("/{id}")
    public Nhom7User updateUser(@PathVariable Long id,
                                @RequestBody Nhom7User user) {
        return nhom7UserService.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        nhom7UserService.deleteUser(id);
    }
}