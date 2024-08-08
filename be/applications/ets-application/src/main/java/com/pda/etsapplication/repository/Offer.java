package com.pda.etsapplication.repository;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Table(name = "offers")
public class Offer {

    @Id
    @Column(name = "offer_no", nullable = false)
    private String offerNo; // 주문일련번호

    @Column(name = "acct_no")
    private String acctNo; // 계좌번호

    @Column(name = "id")
    private Long id; // id

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_code", referencedColumnName = "stock_code", nullable = false)
    private StocksEntity stocks; // 종목코드

    @Column(name = "offer_date", nullable = false)
    private String offerDate; // 주문 날짜

    @Column(name = "status")
    private String status; // 주문 상태

    @Column(name = "type")
    private String type; // 주문 유형

    @Column(name = "quantity")
    private Integer quantity; // 주문 수량

    @Column(name = "price")
    private Double price; // 주문 가격

    @Column(name = "traded")
    private Integer traded; // 체결된 수량

    @Column(name = "not_traded")
    private Integer notTraded; // 미체결 수량

}
