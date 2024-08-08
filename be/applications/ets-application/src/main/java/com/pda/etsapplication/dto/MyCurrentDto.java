package com.pda.etsapplication.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MyCurrentDto {
    private Long offerAmount;
    private Long stockAmount;
}
