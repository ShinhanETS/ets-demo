package com.pda.etsapplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PricesRepository extends JpaRepository<PricesEntity, PricesId> {
    List<PricesEntity> findByStockCode(String stockCode);
    List<PricesEntity> findByStockCodeInAndPriceDate(List<String> stockCode, String pricesDate);

    List<PricesEntity> findByStockCodeAndPriceDate(String stockCode, String priceDate);

    @Query(value = "select p from PricesEntity p where p.stockCode = :stockCode order by p.priceDate desc limit 1")
    PricesEntity findByStockCodeByCurrent(@Param("stockCode") String stockCode);


}
