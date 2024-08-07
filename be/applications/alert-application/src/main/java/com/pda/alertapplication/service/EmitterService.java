package com.pda.alertapplication.service;

import com.pda.kafkautil.TradeKafkaDto;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
public class EmitterService {
    public SseEmitter subscribe(String userId, String lastEventId) {
        return null;
    }

    @KafkaListener(topics = "update-trade", concurrency = "2")
    public void listenTrade(TradeKafkaDto tradeKafkaDto) {

    }
}
