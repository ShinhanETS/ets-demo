package com.pda.accountapplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HoldingRepository extends JpaRepository<Holding, String> {

    List<Holding> findAllById(Long id);

    List<Holding> findAllByIdAndType(Long id, String type);

    Optional<Holding> findByIdAndStockCode(Long id, String stockCode);
}
