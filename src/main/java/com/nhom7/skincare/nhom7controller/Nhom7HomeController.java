package com.nhom7.skincare.nhom7controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Nhom7HomeController {

    @GetMapping("/")
    public String nhom7Home() {
        return "forward:/nhom7index.html";
    }
}