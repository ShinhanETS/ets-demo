package com.pda.etsapplication.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PutHoldingDto {
    private String stockCode;
    private String trType;
    private Integer quantity;
    private Double nowPrice;
    private String currency;
    private String stockType;
    private Integer country;
}
