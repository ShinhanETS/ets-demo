package com.pda.etsapplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PricesRepository extends JpaRepository<PricesEntity, PricesId> {
    List<PricesEntity> findByStockCode(String stockCode);
    List<PricesEntity> findByStockCodeInAndPriceDate(List<String> stockCode, String pricesDate);

    List<PricesEntity> findByStockCodeAndPriceDate(String stockCode, String priceDate);


}
