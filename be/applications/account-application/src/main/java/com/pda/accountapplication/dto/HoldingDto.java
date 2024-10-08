package com.pda.accountapplication.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HoldingDto {

    @JsonProperty("stock_code")
    private String stockCode;

    @JsonProperty("acct_no")
    private String acctNo;

    private Long quantity;

    private String type;

    @JsonProperty("current_price")
    private PriceDto currentPrice;

    @JsonProperty("total_price")
    private Double totalPrice;

    private Integer country;
}
