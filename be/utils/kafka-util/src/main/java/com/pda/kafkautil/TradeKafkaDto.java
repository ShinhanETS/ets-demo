package com.pda.kafkautil;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@JsonSerialize
@JsonDeserialize
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class TradeKafkaDto implements KafkaJson {
    private Long userId; // 유저 pk
    private LocalDateTime tradeDate; // 체결일
    private Integer quantity; // 체결수량
    private Double price; // 체결액
    private String stockCode; // 종목코드
    private String stockName; // 종목명
    private String tradeType; // 체결타입(매수/매도)
    private Integer totalTradeAmount; // 이번달 거래내역 수
    private Double totalKRWAmount; // 보유현황 -> 원화로 환산
}
