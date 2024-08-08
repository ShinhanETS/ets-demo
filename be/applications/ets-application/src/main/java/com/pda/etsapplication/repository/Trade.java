package com.pda.etsapplication.repository;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Table(name = "trades")
public class Trade {
    @Id
    @Column(name = "trade_no", nullable = false)
    private String tradeNo; // 체결일련번호

    @Column(name = "offer_no", nullable = false, unique = true)
    private String offerNo; // 주문일련번호

    @Column(name = "acct_no")
    private String acctNo; // 계좌번호

    @Column(name = "id", nullable = false)
    private Long id; // id

    @Column(name = "quantity")
    private Integer quantity; // 체결 수량

    @Column(name = "price")
    private Double price; // 체결 금액

}
