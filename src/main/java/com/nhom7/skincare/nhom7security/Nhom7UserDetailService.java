package com.nhom7.skincare.nhom7security;

import com.nhom7.skincare.nhom7entity.Nhom7User;
import com.nhom7.skincare.nhom7repository.Nhom7UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class Nhom7UserDetailService implements UserDetailsService {

    @Autowired
    private Nhom7UserRepository nhom7UserRepository;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        Nhom7User user = nhom7UserRepository.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "User not found: " + username
                        ));

        return User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole().name())
                .build();
    }
}