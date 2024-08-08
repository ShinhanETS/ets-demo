package com.pda.etsapplication.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class OfferOrderDto {

    // 계좌번호
    @JsonProperty("acct_no")
    private String acctNo;

    // 종목코드
    @JsonProperty("stock_code")
    private String stockCode;

    // 주문 수량
    @JsonProperty("offer_quantity")
    private Integer offerQuantity;

    // 주문 날짜
    @JsonProperty("offer_date")
    private String offerDate;

    // 주문 유형
    private String type;

    // 주문 상태
    private String status;

    // 주문일련번호
    @JsonProperty("offer_no")
    private String offerNo;

}
