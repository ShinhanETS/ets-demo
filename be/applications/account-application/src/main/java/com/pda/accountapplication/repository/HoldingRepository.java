package com.pda.accountapplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HoldingRepository extends JpaRepository<Holding, String> {

    List<Holding> findAllByUserId(Long id);

    List<Holding> findAllByUserIdAndType(Long id, String type);

    Optional<Holding> findByUserIdAndStockCode(Long id, String stockCode);
    void delete(Holding holding);
}
