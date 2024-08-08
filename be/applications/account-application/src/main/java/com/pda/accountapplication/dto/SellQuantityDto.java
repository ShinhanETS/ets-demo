package com.pda.accountapplication.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SellQuantityDto {

    private Long quantity;

    @JsonProperty("acct_no")
    private String acctNo;

    @JsonProperty("stock_code")
    private String stockCode;
}
