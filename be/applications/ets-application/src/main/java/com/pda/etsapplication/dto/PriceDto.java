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
public class PriceDto {

    private String name;

    private String description;

    private String chg;

    private Double close;

    @JsonProperty("currency_symbol")
    private String currencySymbol;
}
