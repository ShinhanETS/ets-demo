package com.pda.alertapplication.service;

import com.pda.alertapplication.repository.EmitterRepository;
import com.pda.kafkautil.TradeKafkaDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmitterService {
    private final EmitterRepository emitterRepository;

    private void sendToClient(SseEmitter emitter, String emitterId, Object data) {
        try {
            emitter.send(SseEmitter.event()
                .id(emitterId)
                .data(data));
            log.info("Kafka로 부터 전달 받은 메세지 전송. emitterId : {}, message : {}", emitterId, data);
        } catch (IOException e) {
            emitterRepository.deleteById(emitterId);
            log.error("메시지 전송 에러:{}", e);
        }
    }

    public SseEmitter subscribe(Long userId) {
        String emitterId = userId.toString()+"_"+System.currentTimeMillis();
        SseEmitter emitter = emitterRepository.save(emitterId, new SseEmitter(60 * 1000L));
        log.info("emitterId : {} 사용자 emitter 연결 ", emitterId);

        emitter.onCompletion(() -> {
            log.info("연결 종료");
            emitterRepository.deleteById(emitterId);
            });
        emitter.onTimeout(() -> {
                log.info("타임아;");
                emitterRepository.deleteById(emitterId);
            });

        sendToClient(emitter, emitterId, "connected"); // 503 에러방지

        return emitter;
    }

    @KafkaListener(topics = "update-trade", concurrency = "2")
    public void listenTrade(TradeKafkaDto tradeKafkaDto) {
        Map<String, SseEmitter> sseEmitters = emitterRepository.findAllEmitterStartWithById(tradeKafkaDto.getUserId());

        sseEmitters.forEach((emitterId, emitter) -> {
            sendToClient(emitter, emitterId, AlertMessage.builder()
                .stockCode(tradeKafkaDto.getStockCode())
                .stockName(tradeKafkaDto.getStockName())
                .message(String.format("%s %s주 %s 정상 체결되었습니다.", tradeKafkaDto.getStockName(), tradeKafkaDto.getQuantity(), tradeKafkaDto.getTradeType()))
                .build());
        });
    }
}
