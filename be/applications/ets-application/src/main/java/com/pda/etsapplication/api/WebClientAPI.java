package com.pda.etsapplication.api;

import com.pda.apiutil.GlobalResponse;
import com.pda.etsapplication.dto.AccountResDto;
import com.pda.etsapplication.dto.HoldingDto;
import com.pda.etsapplication.dto.PutHoldingDto;
import com.pda.exceptionutil.exceptions.CommonException;
import com.pda.jwtutil.auth.AuthUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class WebClientAPI {

    private final WebClient webClient;


    @Value("${host.sise-server}")
    private String siseServer;

    @Value("${host.account-server}")
    private String accountUrl;

    public AccountResDto getAccount(Long id){
        log.info("account host: " + accountUrl);

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

    public List<HoldingDto> getHoldings(String token) {
        Mono<GlobalResponse<List<HoldingDto>>> mono = webClient.get().uri(accountUrl+"/api/accounts/holdings")
            .header("Authorization", "Bearer " + token)
            .exchangeToMono(reponse -> {
                if (!reponse.statusCode().is2xxSuccessful()){
                    log.info("API = {}", accountUrl + "/api/accounts/holdings");
                    throw  CommonException.create("외부 API 연결 실패 ");
                }
                return reponse.bodyToMono(new ParameterizedTypeReference<GlobalResponse<List<HoldingDto>>>() {
                });

            });
        return mono.block().getData();
    }

    public void putHolding(AuthUser authUser, PutHoldingDto putHoldingDto) {
        Map<String, Object> body = new HashMap<>();
        body.put("stockCode", putHoldingDto.getStockCode());
        body.put("minus", putHoldingDto.isMinus());
        body.put("quantity", putHoldingDto.getQuantity());
        body.put("nowPrice", putHoldingDto.getNowPrice());
        body.put("country", putHoldingDto.getCountry());
        body.put("stockType", putHoldingDto.getStockType());

        Mono<GlobalResponse<Void>> mono = webClient.put().uri(accountUrl+"/api/accounts/holdings")
            .header("Authorization", "Bearer " + authUser.getToken())
            .body(BodyInserters.fromValue(body))
            .exchangeToMono(reponse -> {
                if (!reponse.statusCode().is2xxSuccessful()){
                    log.info("API = {}", accountUrl + "/api/accounts/holdings");
                    throw  CommonException.create("외부 API 연결 실패 ");
                }
                return reponse.bodyToMono(new ParameterizedTypeReference<GlobalResponse<Void>>() {
                });

            });

        mono.block();
    }

}
