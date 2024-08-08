package com.pda.accountapplication.service;

import com.pda.accountapplication.dto.AccountDto;
import com.pda.accountapplication.repository.Account;
import com.pda.accountapplication.repository.AccountRepository;
import com.pda.exceptionutil.exceptions.CommonException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public AccountDto getAccountById(Long id){
        Account foundAccount = accountRepository.findById(id)
                .orElseThrow(() -> CommonException.create("해당 유저의 계좌가 존재하지 않습니다.")); // 왜 에러 메시지 안뜨지..

        return AccountDto.builder()
                .acctNo(foundAccount.getAcctNo())
                .userId(foundAccount.getUserId())
                .name(foundAccount.getName())
                .won(foundAccount.getWon())
                .euro(foundAccount.getEuro())
                .yuan(foundAccount.getYuan())
                .dollar(foundAccount.getDollar())
                .build();
    }
}
