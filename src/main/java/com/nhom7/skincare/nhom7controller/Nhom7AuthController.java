package com.nhom7.skincare.nhom7controller;

import com.nhom7.skincare.nhom7dto.Nhom7UserDTO;
import com.nhom7.skincare.nhom7entity.Nhom7User;
import com.nhom7.skincare.nhom7mapper.Nhom7UserMapper;
import com.nhom7.skincare.nhom7service.Nhom7UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class Nhom7AuthController {

    @Autowired
    private Nhom7UserService nhom7UserService;

    @PostMapping("/register")
    public Nhom7UserDTO register(
            @Valid @RequestBody Nhom7UserDTO userDTO) {

        Nhom7User user = Nhom7UserMapper.toEntity(userDTO);
        Nhom7User savedUser = nhom7UserService.createUser(user);

        return Nhom7UserMapper.toDTO(savedUser);
    }
}