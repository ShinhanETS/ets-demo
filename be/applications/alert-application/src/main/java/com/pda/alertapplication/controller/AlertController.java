package com.pda.alertapplication.controller;

import com.pda.alertapplication.service.EmitterService;
import com.pda.exceptionutil.exceptions.CommonException;
import com.pda.jwtutil.JwtUtil;
import com.pda.jwtutil.TokenAuth;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@Slf4j
@RequiredArgsConstructor
public class AlertController {
    private final EmitterService emitterService;

    @GetMapping(value = "/subscribe", produces = "text/event-stream")
    public SseEmitter subscribe(HttpServletRequest request) {
        TokenAuth tokenAuth = JwtUtil.parseToken(JwtUtil.resolveToken(request))
            .orElseThrow(() -> CommonException.create("인증 오류"));

        return emitterService.subscribe(tokenAuth.getId()) ;
    }
}
