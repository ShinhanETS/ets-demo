package com.pda.etsapplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StocksRepository extends JpaRepository<StocksEntity, String> {
    List<StocksEntity> findByCountryAndSector(Integer country, String sector);
    boolean existsByStockCode(String stockCode);
}
