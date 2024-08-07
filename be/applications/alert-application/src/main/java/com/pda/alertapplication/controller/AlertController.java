package com.pda.alertapplication.controller;

import com.pda.alertapplication.service.EmitterService;
import com.pda.jwtutil.auth.AuthInfo;
import com.pda.jwtutil.auth.AuthUser;
import com.pda.jwtutil.auth.Authenticated;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@Slf4j
@RequiredArgsConstructor
public class AlertController {
    private final EmitterService emitterService;

    @Authenticated
    @GetMapping(value = "/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(
        @AuthInfo AuthUser authUser,
        @RequestHeader(value = "Last-Event-ID", required = false) String lastEventId
        ) {
        return emitterService.subscribe(authUser.getUsername(), lastEventId);
    }
}
