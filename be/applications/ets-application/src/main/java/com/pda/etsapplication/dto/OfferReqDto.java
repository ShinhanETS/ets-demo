package com.pda.etsapplication.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OfferReqDto {

    @JsonProperty("stock_code")
    private String stockCode;

    private Double price;

    private Integer quantity;
}
