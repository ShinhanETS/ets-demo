package com.pda.accountapplication.controller;

import com.pda.accountapplication.dto.AccountDto;
import com.pda.accountapplication.dto.HoldingDto;
import com.pda.accountapplication.service.AccountService;
import com.pda.accountapplication.service.HoldingService;
import com.pda.apiutil.ApiUtil;
import com.pda.apiutil.GlobalResponse;
import com.pda.jwtutil.auth.AuthInfo;
import com.pda.jwtutil.auth.AuthUser;
import com.pda.jwtutil.auth.Authenticated;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AccountController {

    @Autowired
    private final AccountService accountService;
    @Autowired
    private final HoldingService holdingService;

    @GetMapping("/test")
    @Authenticated
    public GlobalResponse<AuthUser> test(@AuthInfo AuthUser authUser) {
        return ApiUtil.success("성공", authUser);
    }

    // 계좌 조회
    @GetMapping("/")
    public GlobalResponse<AccountDto> getAccountByUserId(@AuthInfo AuthUser authUser){
        AccountDto accountDto = accountService.getAccountById(authUser.getId());
        System.out.println(accountDto);
        return ApiUtil.success("성공", accountDto);
    }



    //

}
