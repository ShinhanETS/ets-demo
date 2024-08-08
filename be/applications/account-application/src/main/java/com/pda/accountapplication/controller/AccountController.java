package com.pda.accountapplication.controller;

import com.pda.accountapplication.dto.AccountDto;
import com.pda.accountapplication.dto.HoldingDto;
import com.pda.accountapplication.dto.SellQuantityDto;
import com.pda.accountapplication.service.AccountService;
import com.pda.accountapplication.service.HoldingService;
import com.pda.apiutil.ApiUtil;
import com.pda.apiutil.GlobalResponse;
import com.pda.jwtutil.auth.AuthInfo;
import com.pda.jwtutil.auth.AuthUser;
import com.pda.jwtutil.auth.Authenticated;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
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
    @Authenticated
    @GetMapping
    public GlobalResponse<AccountDto> getAccountByUserId(@AuthInfo AuthUser authUser){
        AccountDto accountDto = accountService.getAccountById(authUser.getId());
        System.out.println(accountDto);
        return ApiUtil.success("성공", accountDto);
    }

    @Authenticated
    @GetMapping("/total")
    public GlobalResponse<Long> getTotalWon(@AuthInfo AuthUser authUser){
        return ApiUtil.success("계좌 총 금액 조회", accountService.getTotalWon(authUser.getId()));
    }

    // 계좌 조회
    @GetMapping("/{id}")
    public GlobalResponse<AccountDto> getAccountById(@PathVariable Long id){
        log.info("hi 요청 들어옴 = {}", id);

        AccountDto accountDto = accountService.getAccountById(id);

        System.out.println(accountDto);
        return ApiUtil.success("성공", accountDto);
    }

    // 보유 종목 조회
    @GetMapping("/holdings")
    public GlobalResponse<List<HoldingDto>> getHoldings(@AuthInfo AuthUser authUser){
        List<HoldingDto> holdingDtoList = holdingService.getHoldingList(authUser.getId());
        return ApiUtil.success("성공", holdingDtoList);
    }

    // 보유 종목 조회(거래권)
    @GetMapping("/holdings/ets")
    public GlobalResponse<List<HoldingDto>> getETSHoldings(@AuthInfo AuthUser authUser){
        List<HoldingDto> holdingDtoList = holdingService.getHoldingListbyStockType(authUser.getId(), "ets");
        return ApiUtil.success("성공", holdingDtoList);
    }

    // 보유 종목 조회(선물)
    @GetMapping("/holdings/futures")
    public GlobalResponse<List<HoldingDto>> getFutureHoldings(@AuthInfo AuthUser authUser){
        List<HoldingDto> holdingDtoList = holdingService.getHoldingListbyStockType(authUser.getId(), "future");
        return ApiUtil.success("성공", holdingDtoList);
    }

    // 보유 종목 조회(ETN)
    @GetMapping("/holdings/etn")
    public GlobalResponse<List<HoldingDto>> getETNHoldings(@AuthInfo AuthUser authUser){
        List<HoldingDto> holdingDtoList = holdingService.getHoldingListbyStockType(authUser.getId(), "etn");
        return ApiUtil.success("성공", holdingDtoList);
    }

    // 보유 종목 조회(ETF)
    @GetMapping("/holdings/etf")
    public GlobalResponse<List<HoldingDto>> getETFHoldings(@AuthInfo AuthUser authUser){
        List<HoldingDto> holdingDtoList = holdingService.getHoldingListbyStockType(authUser.getId(), "etf");
        return ApiUtil.success("성공", holdingDtoList);
    }

    // 보유 주식 매도 가능 수량 조회
    @GetMapping("/stock/sell/{stock_code}")
    public GlobalResponse<SellQuantityDto> getSellQuantity(@AuthInfo AuthUser authUser, @PathVariable("stock_code") String stockCode ){
        SellQuantityDto sellQuantityDto = holdingService.getSellQuantity(authUser.getId(), stockCode);
        return ApiUtil.success("성공", sellQuantityDto);
    }


    // 당월투자금액


    // 보유주식총액


    // 예수금 총액


}
