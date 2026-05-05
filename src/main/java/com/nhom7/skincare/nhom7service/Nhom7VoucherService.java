package com.nhom7.skincare.nhom7service;

import com.nhom7.skincare.nhom7entity.Nhom7Voucher;

import java.util.List;
import java.util.Optional;

public interface Nhom7VoucherService {

    List<Nhom7Voucher> getAllVouchers();

    Optional<Nhom7Voucher> getVoucherById(Long id);

    Optional<Nhom7Voucher> getVoucherByCode(String code);

    Nhom7Voucher createVoucher(Nhom7Voucher voucher);

    Nhom7Voucher updateVoucher(Long id, Nhom7Voucher voucher);

    void deleteVoucher(Long id);
}