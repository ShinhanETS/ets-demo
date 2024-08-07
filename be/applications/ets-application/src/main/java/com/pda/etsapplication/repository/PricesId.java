package com.pda.etsapplication.repository;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PricesId implements Serializable {
    private String priceDate;
    private String stockCode;

    // equals와 hashCode 메서드
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PricesId)) return false;
        PricesId that = (PricesId) o;
        return Objects.equals(priceDate, that.priceDate) && Objects.equals(stockCode, that.stockCode);
    }

    @Override
    public int hashCode() {
        return Objects.hash(priceDate, stockCode);
    }
}