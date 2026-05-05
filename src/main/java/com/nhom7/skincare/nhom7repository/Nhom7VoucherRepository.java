package com.nhom7.skincare.nhom7repository;

import com.nhom7.skincare.nhom7entity.Nhom7Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface Nhom7VoucherRepository extends JpaRepository<Nhom7Voucher, Long> {

    Optional<Nhom7Voucher> findByCode(String code);

    boolean existsByCode(String code);
}