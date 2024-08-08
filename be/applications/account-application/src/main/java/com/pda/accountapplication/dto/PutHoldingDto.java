package com.pda.accountapplication.dto;

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
    private boolean isMinus;
    private Integer quantity;
    private Double nowPrice;
    private Integer country;
    private String stockType;
}
