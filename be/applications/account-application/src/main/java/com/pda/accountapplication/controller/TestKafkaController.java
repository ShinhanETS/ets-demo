package com.pda.accountapplication.controller;

import com.pda.kafkautil.KafkaJson;
import com.pda.kafkautil.TradeKafkaDto;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/kafka")
public class TestKafkaController {
    private final KafkaTemplate<String, KafkaJson> kafkaTemplate;

    @GetMapping("/test")
    public String testKafka() {
        sendMessage();
        return "test kafka";
    }

    @Async
    public void sendMessage() {
        kafkaTemplate.send("update-trade", TradeKafkaDto.builder()
                .userId(1L)
                .price(2000D)
                .quantity(3)
                .stockCode("stock")
                .stockName("stockName")
                .totalKRWAmount(4200000D)
                .totalTradeAmount(20)
                .tradeDate(LocalDateTime.now())
                .tradeType("매수")
            .build());
    }
}
