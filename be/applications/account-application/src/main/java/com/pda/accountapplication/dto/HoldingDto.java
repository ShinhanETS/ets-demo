package com.pda.accountapplication.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pda.accountapplication.repository.Account;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HoldingDto {

    @JsonProperty("stock_code")
    private String stockCode;

    @JsonProperty("acct_no")
    private String acctNo;

    private Long quantity;

    private Float totalPrice;

    private Integer country;
}
