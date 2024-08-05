package com.pda.accountapplication.controller;

import com.pda.apiutil.ApiUtil;
import com.pda.apiutil.GlobalResponse;
import com.pda.jwtutil.auth.AuthInfo;
import com.pda.jwtutil.auth.AuthUser;
import com.pda.jwtutil.auth.Authenticated;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AccountController {

    @GetMapping("/test")
    @Authenticated
    public GlobalResponse<AuthUser> test(@AuthInfo AuthUser authUser) {
        return ApiUtil.success("성공", authUser);
    }
}
