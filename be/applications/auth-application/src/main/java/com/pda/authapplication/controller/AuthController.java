package com.pda.authapplication.controller;

import com.pda.apiutil.ApiUtil;
import com.pda.apiutil.GlobalResponse;
import com.pda.authapplication.controller.dto.req.SignInRequest;
import com.pda.authapplication.service.AuthService;
import com.pda.authapplication.service.dto.req.SignInServiceRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/sign-in")
    public GlobalResponse<String> signIn(@Valid @RequestBody SignInRequest signInRequest) {
        return ApiUtil.success("로그인 성공", authService.signIn(SignInServiceRequest.builder()
                .userId(signInRequest.getUserId())
                .password(signInRequest.getPassword())
            .build()));
    }
}
