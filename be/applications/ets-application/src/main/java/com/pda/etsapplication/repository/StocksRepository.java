package com.pda.etsapplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StocksRepository extends JpaRepository<StocksEntity, String> {
    List<StocksEntity> findByCountryAndSector(Integer country, String sector);

    Optional<StocksEntity> findByStockCode(String stockCode);
    boolean existsByStockCode(String stockCode);

    List<StocksEntity> findByStockCodeIn(List<String> stockCodes);
}
