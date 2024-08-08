package com.pda.accountapplication.api;

import com.pda.accountapplication.dto.HoldingDto;
import com.pda.apiutil.GlobalResponse;
import com.pda.exceptionutil.exceptions.CommonException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class WebClientAPI {

    private final WebClient webClient;

    @Value("${host.ets-server}")
    private String etsUrl;

    public List<HoldingDto> getHoldingList(List<HoldingDto> holdingDtoList){
        log.info("account host: " + etsUrl);

        Mono<GlobalResponse<List<HoldingDto>>> mono = webClient.post().uri(etsUrl + "/api/ets/current")
                .bodyValue(holdingDtoList)
                .exchangeToMono(reponse -> {
                    if (!reponse.statusCode().is2xxSuccessful()){
                        log.info("API = {}", etsUrl + "/api/ets/current");
                        throw  CommonException.create("외부 API 연결 실패 ");
                    }
                    return reponse.bodyToMono(new ParameterizedTypeReference<GlobalResponse<List<HoldingDto>>>() {
                    });

                });
        log.info("find holdings = {}", mono.block().getData());
        return mono.block().getData();
    }

}
