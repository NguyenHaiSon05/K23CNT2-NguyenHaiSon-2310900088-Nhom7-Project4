package com.nhom7.skincare.nhom7controller;

import com.nhom7.skincare.nhom7dto.Nhom7UserDTO;
import com.nhom7.skincare.nhom7entity.Nhom7User;
import com.nhom7.skincare.nhom7mapper.Nhom7UserMapper;
import com.nhom7.skincare.nhom7service.Nhom7UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class Nhom7AuthController {

    @Autowired
    private Nhom7UserService nhom7UserService;

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody Nhom7UserDTO userDTO) {

        if (nhom7UserService.existsByEmail(userDTO.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email đã được sử dụng"));
        }

        if (nhom7UserService.existsByUsername(userDTO.getUsername())) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Username đã được sử dụng"));
        }

        Nhom7User user = Nhom7UserMapper.toEntity(userDTO);
        Nhom7User savedUser = nhom7UserService.createUser(user);

        return ResponseEntity.ok(Nhom7UserMapper.toDTO(savedUser));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Map<String, String> request) {

        String email = request.get("email");
        String password = request.get("password");

        try {
            Nhom7User user = nhom7UserService.login(email, password);

            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("username", user.getUsername());
            response.put("email", user.getEmail());
            response.put("fullName", user.getFullName());
            response.put("role", user.getRole());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(401)
                    .body(Map.of("message", e.getMessage()));
        }
    }
}