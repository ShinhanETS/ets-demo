package com.pda.etsapplication.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class OfferTradeDto {

    // 체결일련번호
    @JsonProperty("trade_no")
    private String tradeNo;

    // 체결 수량
    @JsonProperty("trade_quantity")
    private Integer tradeQuantity;

    // 미체결 수량
    @JsonProperty("not_trade_quantity")
    private Integer notTradeQuantity;

    // 체결 금액
    private Double tradePrice;


}
