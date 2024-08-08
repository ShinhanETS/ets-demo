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
public class AccountResDto {
    @JsonProperty("acct_no")
    private String acctNo;
    @JsonProperty("user_id")
    private String userId;
    private String name;

    private Double won;

    private Double euro;

    private Double yuan;

    private Double dollar;
}
