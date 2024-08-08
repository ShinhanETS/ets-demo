package com.pda.accountapplication.service;

import com.pda.accountapplication.api.WebClientAPI;
import com.pda.accountapplication.dto.HoldingDto;
import com.pda.accountapplication.dto.PutHoldingDto;
import com.pda.accountapplication.dto.SellQuantityDto;
import com.pda.accountapplication.repository.Account;
import com.pda.accountapplication.repository.AccountRepository;
import com.pda.accountapplication.repository.Holding;
import com.pda.accountapplication.repository.HoldingRepository;
import com.pda.exceptionutil.exceptions.CommonException;
import com.pda.jwtutil.auth.AuthUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class HoldingService {

    @Autowired
    private HoldingRepository holdingRepository;
    private final AccountRepository accountRepository;
    private final WebClientAPI webClientAPI;

    public List<HoldingDto> getHoldingList(Long id){
        List<Holding> holdings = holdingRepository.findAllById(id);
        return holdings.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<HoldingDto> getHoldingListbyStockType(Long id, String type) {
        log.info("보유종목조회 = {}, {}", id, type);
        List<Holding> holdings = holdingRepository.findAllByIdAndType(id, type);
        List<HoldingDto> holdingDtos = holdings.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        List<HoldingDto> updatedholdingDtos = webClientAPI.getHoldingList(holdingDtos);
        return updatedholdingDtos;
    }

    private HoldingDto convertToDTO(Holding holding) {
        return HoldingDto.builder()
                .stockCode(holding.getStockCode())
                .acctNo(holding.getAccount().getAcctNo())
                .quantity(holding.getQuantity())
                .currentPrice(null)
                .type(holding.getType())
                .totalPrice(holding.getTotalPrice())
                .country(holding.getCountry())
                .build();
    }


    public SellQuantityDto getSellQuantity(Long id, String stockCode) {
        Optional<Holding> holding = holdingRepository.findByIdAndStockCode(id, stockCode);

        if(!holding.isEmpty()){
            return SellQuantityDto.builder()
                    .acctNo(holding.get().getAccount().getAcctNo())
                    .quantity(holding.get().getQuantity())
                    .stockCode(stockCode)
                    .build();
        }else{
            return SellQuantityDto.builder()
                    .acctNo(null)
                    .quantity(0L)
                    .stockCode(stockCode)
                    .build();
        }

    }

    public Void putHolding(AuthUser authUser, PutHoldingDto putHoldingDto) {
        Account account = accountRepository.findById(authUser.getId())
            .orElseThrow(() -> CommonException.create("현재 계좌가 없음"));

        Double totalPrice = 0D;
        if (putHoldingDto.isMinus()) {
            totalPrice += putHoldingDto.getNowPrice()*putHoldingDto.getQuantity();
        } else {
            totalPrice -= putHoldingDto.getNowPrice()*putHoldingDto.getQuantity();
        }

        // FIXME: 일단 totalPrice를 어디에서 쓰는지...
        if (putHoldingDto.getCountry().equals(0)) {
            account.setWon(account.getWon()+totalPrice);
            accountRepository.save(account);
            Holding holding = holdingRepository.findByIdAndStockCode(authUser.getId(), putHoldingDto.getStockCode());

            if (holding == null) {
              holdingRepository.save(Holding.builder()
                      .account(account)
                      .type(putHoldingDto.getStockType())
                      .stockCode(putHoldingDto.getStockCode())
                      .quantity(putHoldingDto.getQuantity().longValue())
                      .id(authUser.getId())
                      .totalPrice(putHoldingDto.getNowPrice()* putHoldingDto.getQuantity())
                      .country(putHoldingDto.getCountry())
                  .build());
            } else if (putHoldingDto.isMinus()) {
                holding.setQuantity(holding.getQuantity() - putHoldingDto.getQuantity());
                holdingRepository.save(holding);
            } else {
                holding.setQuantity(holding.getQuantity() + putHoldingDto.getQuantity());
                holdingRepository.save(holding);
            }
        } else if (putHoldingDto.getCountry().equals(1)) {
            account.setEuro(account.getEuro()+totalPrice);
            accountRepository.save(account);

            account.setWon(account.getWon()+totalPrice);
            accountRepository.save(account);
            Holding holding = holdingRepository.findByIdAndStockCode(authUser.getId(), putHoldingDto.getStockCode());

            if (holding == null) {
                holdingRepository.save(Holding.builder()
                    .account(account)
                    .type(putHoldingDto.getStockType())
                    .stockCode(putHoldingDto.getStockCode())
                    .quantity(putHoldingDto.getQuantity().longValue())
                    .id(authUser.getId())
                    .totalPrice(putHoldingDto.getNowPrice()* putHoldingDto.getQuantity())
                    .country(putHoldingDto.getCountry())
                    .build());
            } else if (putHoldingDto.isMinus()) {
                holding.setQuantity(holding.getQuantity() - putHoldingDto.getQuantity());
                holdingRepository.save(holding);
            } else {
                holding.setQuantity(holding.getQuantity() + putHoldingDto.getQuantity());
                holdingRepository.save(holding);
            }
        } else if (putHoldingDto.getCountry().equals(2)) {
            account.setYuan(account.getYuan()+totalPrice);
            accountRepository.save(account);
            Holding holding = holdingRepository.findByIdAndStockCode(authUser.getId(), putHoldingDto.getStockCode());

            if (holding == null) {
                holdingRepository.save(Holding.builder()
                    .account(account)
                    .type(putHoldingDto.getStockType())
                    .stockCode(putHoldingDto.getStockCode())
                    .quantity(putHoldingDto.getQuantity().longValue())
                    .id(authUser.getId())
                    .totalPrice(putHoldingDto.getNowPrice()* putHoldingDto.getQuantity())
                    .country(putHoldingDto.getCountry())
                    .build());
            } else if (putHoldingDto.isMinus()) {
                holding.setQuantity(holding.getQuantity() - putHoldingDto.getQuantity());
                holdingRepository.save(holding);
            } else {
                holding.setQuantity(holding.getQuantity() + putHoldingDto.getQuantity());
                holdingRepository.save(holding);
            }
        } else if (putHoldingDto.getCountry().equals(3)) {
            account.setDollar(account.getDollar()+totalPrice);
            accountRepository.save(account);
            Holding holding = holdingRepository.findByIdAndStockCode(authUser.getId(), putHoldingDto.getStockCode());

            if (holding == null) {
                holdingRepository.save(Holding.builder()
                    .account(account)
                    .type(putHoldingDto.getStockType())
                    .stockCode(putHoldingDto.getStockCode())
                    .quantity(putHoldingDto.getQuantity().longValue())
                    .id(authUser.getId())
                    .totalPrice(putHoldingDto.getNowPrice()* putHoldingDto.getQuantity())
                    .country(putHoldingDto.getCountry())
                    .build());
            } else if (putHoldingDto.isMinus()) {
                holding.setQuantity(holding.getQuantity() - putHoldingDto.getQuantity());
                holdingRepository.save(holding);
            } else {
                holding.setQuantity(holding.getQuantity() + putHoldingDto.getQuantity());
                holdingRepository.save(holding);
            }
        }

        return null;
    }
}
