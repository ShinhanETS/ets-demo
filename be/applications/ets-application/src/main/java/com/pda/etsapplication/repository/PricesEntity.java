package com.pda.etsapplication.repository;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@DynamicInsert
@DynamicUpdate
@Getter
@Table(name = "Prices")
@IdClass(PricesId.class)
public class PricesEntity {
    @Id
    @Column(name = "price_date", nullable = false)
    private String priceDate;

    @Id
    @Column(name = "stock_code", nullable = false)
    private String stockCode;

    @Column(name = "close")
    private Double close;

    @Column(name = "open")
    private Double open;

    @Column(name = "high")
    private Double high;

    @Column(name = "low")
    private Double low;

    @Column(name = "volume")
    private Long volume;  // BIGINT에 해당하는 타입

    @Column(name = "chg")
    private String chg;
}
