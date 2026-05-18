package com.nhom7.skincare.nhom7mapper;

import com.nhom7.skincare.nhom7dto.Nhom7UserDTO;
import com.nhom7.skincare.nhom7entity.Nhom7User;

public class Nhom7UserMapper {

    public static Nhom7UserDTO toDTO(Nhom7User user) {
        return Nhom7UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .address(user.getAddress())
                // password KHÔNG map ra DTO (bảo mật)
                .build();
    }

    public static Nhom7User toEntity(Nhom7UserDTO userDTO) {
        return Nhom7User.builder()
                .id(userDTO.getId())
                .username(userDTO.getUsername())
                .password(userDTO.getPassword()) // ← THÊM DÒNG NÀY
                .fullName(userDTO.getFullName())
                .email(userDTO.getEmail())
                .phone(userDTO.getPhone())
                .address(userDTO.getAddress())
                .build();
    }
}