package com.nhom7.skincare.nhom7controller;

import com.nhom7.skincare.nhom7entity.Nhom7Voucher;
import com.nhom7.skincare.nhom7service.Nhom7VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vouchers")
public class Nhom7VoucherController {

    @Autowired
    private Nhom7VoucherService nhom7VoucherService;

    @GetMapping
    public List<Nhom7Voucher> getAllVouchers() {
        return nhom7VoucherService.getAllVouchers();
    }

    @GetMapping("/{id}")
    public Optional<Nhom7Voucher> getVoucherById(@PathVariable Long id) {
        return nhom7VoucherService.getVoucherById(id);
    }

    @GetMapping("/code/{code}")
    public Optional<Nhom7Voucher> getVoucherByCode(@PathVariable String code) {
        return nhom7VoucherService.getVoucherByCode(code);
    }

    @PostMapping
    public Nhom7Voucher createVoucher(@RequestBody Nhom7Voucher voucher) {
        return nhom7VoucherService.createVoucher(voucher);
    }

    @PutMapping("/{id}")
    public Nhom7Voucher updateVoucher(@PathVariable Long id,
                                      @RequestBody Nhom7Voucher voucher) {
        return nhom7VoucherService.updateVoucher(id, voucher);
    }

    @DeleteMapping("/{id}")
    public void deleteVoucher(@PathVariable Long id) {
        nhom7VoucherService.deleteVoucher(id);
    }
}