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
    private boolean isMinus;
    private Integer quantity;
    private Double nowPrice;
    private Integer country;
    private String stockType;
}
