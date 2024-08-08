package com.pda.accountapplication.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PriceDto {

    private String name;

    private String description;

    private String chg;

    private Double close;

    @JsonProperty("currency_symbol")
    private String currencySymbol;
}
