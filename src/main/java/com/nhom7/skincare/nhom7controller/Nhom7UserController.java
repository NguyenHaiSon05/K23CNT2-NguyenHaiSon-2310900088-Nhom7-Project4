package com.nhom7.skincare.nhom7controller;

import com.nhom7.skincare.nhom7dto.Nhom7UserDTO;
import com.nhom7.skincare.nhom7entity.Nhom7User;
import com.nhom7.skincare.nhom7mapper.Nhom7UserMapper;
import com.nhom7.skincare.nhom7service.Nhom7UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class Nhom7UserController {

    @Autowired
    private Nhom7UserService nhom7UserService;

    @GetMapping
    public List<Nhom7UserDTO> getAllUsers() {
        return nhom7UserService.getAllUsers()
                .stream()
                .map(Nhom7UserMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Nhom7UserDTO getUserById(@PathVariable Long id) {
        Optional<Nhom7User> user = nhom7UserService.getUserById(id);

        return user.map(Nhom7UserMapper::toDTO).orElse(null);
    }

    @PostMapping
    public Nhom7UserDTO createUser(@Valid @RequestBody Nhom7UserDTO userDTO) {
        Nhom7User user = Nhom7UserMapper.toEntity(userDTO);
        Nhom7User savedUser = nhom7UserService.createUser(user);

        return Nhom7UserMapper.toDTO(savedUser);
    }

    @PutMapping("/{id}")
    public Nhom7UserDTO updateUser(@PathVariable Long id,
                                   @Valid @RequestBody Nhom7UserDTO userDTO) {
        Nhom7User user = Nhom7UserMapper.toEntity(userDTO);
        Nhom7User updatedUser = nhom7UserService.updateUser(id, user);

        return Nhom7UserMapper.toDTO(updatedUser);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        nhom7UserService.deleteUser(id);
    }
}