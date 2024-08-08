package com.pda.etsapplication.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
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
