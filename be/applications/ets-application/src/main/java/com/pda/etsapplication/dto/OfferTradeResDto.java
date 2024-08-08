package com.pda.etsapplication.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class OfferTradeResDto {
    OfferOrderDto order;
    OfferTradeDto trade;
}
