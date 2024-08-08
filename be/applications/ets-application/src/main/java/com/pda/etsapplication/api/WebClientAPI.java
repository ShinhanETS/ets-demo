package com.pda.etsapplication.api;

import com.pda.apiutil.GlobalResponse;
import com.pda.etsapplication.dto.AccountResDto;
import com.pda.exceptionutil.exceptions.CommonException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@Slf4j
@RequiredArgsConstructor
public class WebClientAPI {

    private final WebClient webClient;


    @Value("${server.host.sise-server}")
    private String siseServer;

    @Value("${server.host.account-server}")
    private String accountUrl;

    public AccountResDto getAccount(Long id){
        Mono<GlobalResponse<AccountResDto>> mono = webClient.get().uri(accountUrl + "/api/accounts/" + id)
                .exchangeToMono(reponse -> {
                    if (!reponse.statusCode().is2xxSuccessful()){
                        log.info("API = {}", accountUrl + "/api/accounts/" + id);
                        throw  CommonException.create("외부 API 연결 실패 ");
                    }
                    return reponse.bodyToMono(new ParameterizedTypeReference<GlobalResponse<AccountResDto>>() {
                    });

                });
        log.info("find account = {}", mono.block().getData());
        return mono.block().getData();
    }

}
