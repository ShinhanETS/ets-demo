package com.pda.etsapplication.controller.dto.res;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StocksDto {
    private String name;
    private String description;
    private String chg;
    private Double close;
    private String currencySymbol;
}
