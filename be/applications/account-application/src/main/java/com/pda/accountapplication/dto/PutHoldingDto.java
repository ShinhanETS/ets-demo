package com.pda.accountapplication.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class PutHoldingDto {
    private String stockCode;
    private String trType;
    private Integer quantity;
    private Double nowPrice;
    private String currency;
    private String stockType;
    private Integer country;
}
