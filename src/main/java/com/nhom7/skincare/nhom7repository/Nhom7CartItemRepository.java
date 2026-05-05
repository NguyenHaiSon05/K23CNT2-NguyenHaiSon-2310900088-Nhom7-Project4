package com.nhom7.skincare.nhom7repository;

import com.nhom7.skincare.nhom7entity.Nhom7CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface Nhom7CartItemRepository extends JpaRepository<Nhom7CartItem, Long> {

    List<Nhom7CartItem> findByCartId(Long cartId);

    Optional<Nhom7CartItem> findByCartIdAndProductId(Long cartId, Long productId);
}