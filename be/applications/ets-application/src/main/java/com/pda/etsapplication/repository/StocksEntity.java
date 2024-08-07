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
@Table(name = "Stocks")
public class StocksEntity {
    @Id
    @Column(name = "stock_code", nullable = false, unique = true)
    private String stockCode;

    @Column(name = "market", nullable = false)
    private String market;

    @Column(name="name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "country", nullable = false)
    private Integer country;

    @Column(name = "sector", nullable = false)
    private String sector;

    @Column(name = "currency", nullable = false)
    private String currency;
}
