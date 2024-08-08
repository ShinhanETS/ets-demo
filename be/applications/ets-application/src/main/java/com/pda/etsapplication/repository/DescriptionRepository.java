package com.pda.etsapplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DescriptionRepository extends JpaRepository<DescriptionEntity, String> {
    Optional<DescriptionEntity> findByStockCode(String stockCode);
}
