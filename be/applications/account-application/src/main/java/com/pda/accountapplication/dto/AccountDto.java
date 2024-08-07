package com.pda.accountapplication.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountDto {

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
