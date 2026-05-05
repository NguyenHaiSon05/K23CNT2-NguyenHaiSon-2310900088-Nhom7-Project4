package com.nhom7.skincare.nhom7service.impl;

import com.nhom7.skincare.nhom7entity.Nhom7Voucher;
import com.nhom7.skincare.nhom7exception.Nhom7ResourceNotFoundException;
import com.nhom7.skincare.nhom7repository.Nhom7VoucherRepository;
import com.nhom7.skincare.nhom7service.Nhom7VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Nhom7VoucherServiceImpl implements Nhom7VoucherService {

    @Autowired
    private Nhom7VoucherRepository nhom7VoucherRepository;

    @Override
    public List<Nhom7Voucher> getAllVouchers() {
        return nhom7VoucherRepository.findAll();
    }

    @Override
    public Optional<Nhom7Voucher> getVoucherById(Long id) {
        return nhom7VoucherRepository.findById(id);
    }

    @Override
    public Optional<Nhom7Voucher> getVoucherByCode(String code) {
        return nhom7VoucherRepository.findByCode(code);
    }

    @Override
    public Nhom7Voucher createVoucher(Nhom7Voucher voucher) {
        return nhom7VoucherRepository.save(voucher);
    }

    @Override
    public Nhom7Voucher updateVoucher(Long id, Nhom7Voucher voucher) {
        Nhom7Voucher existingVoucher = nhom7VoucherRepository.findById(id)
                .orElseThrow(() ->
                        new Nhom7ResourceNotFoundException(
                                "Voucher not found with id: " + id
                        ));

        existingVoucher.setCode(voucher.getCode());
        existingVoucher.setDiscountPercent(voucher.getDiscountPercent());
        existingVoucher.setQuantity(voucher.getQuantity());
        existingVoucher.setStartDate(voucher.getStartDate());
        existingVoucher.setEndDate(voucher.getEndDate());
        existingVoucher.setStatus(voucher.getStatus());

        return nhom7VoucherRepository.save(existingVoucher);
    }

    @Override
    public void deleteVoucher(Long id) {
        nhom7VoucherRepository.deleteById(id);
    }
}