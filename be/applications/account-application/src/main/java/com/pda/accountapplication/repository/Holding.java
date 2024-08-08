package com.pda.accountapplication.repository;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Table(name = "holdings")
@Setter
public class Holding {

    @Id
    @Column(name = "stock_code", nullable = false)
    private String stockCode; // 종목 코드

    @ManyToOne
    @JoinColumn(name = "acct_no", referencedColumnName = "acct_no")
    private Account account; // 계좌번호

    @Column(name = "id", nullable = false)
    private Long id; // id

    @Column(name = "quantity")
    private Long quantity; // 수량

    @Column(name = "type")
    private String type; // 종목유형

    @Column(name = "total_price")
    private Double totalPrice; // 총매수가격

    @Column(name = "country")
    private Integer country; // 국가구분
}