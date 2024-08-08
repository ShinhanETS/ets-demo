package com.pda.etsapplication.service;

import com.pda.etsapplication.api.WebClientAPI;
import com.pda.etsapplication.dto.*;
import com.pda.etsapplication.repository.*;
import com.pda.exceptionutil.exceptions.CommonException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@Service
@RequiredArgsConstructor
public class OfferService {

    private final StocksRepository stocksRepository;

    private final OfferRepository offerRepository;

    private final TradeRepository tradeRepository;

    private final WebClientAPI webClientAPI;

    public OfferTradeResDto placeBuyOrder(OfferReqDto offerReqDto, Long id) {
        // 0. 요청 들어옴(주문번호 생성, 주문날짜 생성)
        String date = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyMMddHHmmss"));
        String offerNum = generateNumber("Ofr", date, offerReqDto.getStockCode(), id);
        log.info("offer number = {}", offerNum);

        // 1. 계좌 확인(id로)
        AccountResDto account = getAccount(id);
        log.info("get account = {}", account.getAcctNo());

        // 2. 종목 정보 확인
        StocksEntity stock = findByStockCode(offerReqDto.getStockCode());
        log.info("stock info = {}, {}, {}", stock.getStockCode(), stock.getCountry(), stock.getDescription(), stock.getName());

        // dto 주문 객체 생성
        OfferOrderDto offerOrderDto =
                OfferOrderDto.builder()
                        .acctNo(account.getAcctNo())
                        .stockCode(stock.getStockCode())
                        .offerQuantity(offerReqDto.getQuantity())
                        .offerDate(date.substring(0, 9))
                        .type("buy")
                        .offerNo(offerNum)
                .build();

        // 3. 잔고 확인(부족하면 주문상태 failed 처리 후 return) + 주문 상태 처리(PENDING / FAILED)
        if(!checkBalance(stock,account,offerReqDto)){
            log.info("잔고가 부족하여 failed 처리");
            createOffer(id, date.substring(0, 9), offerNum, stock, account, offerReqDto, "buy","FAILED");


            offerOrderDto.setStatus("FAILED");
            OfferTradeDto offerTradeDto = OfferTradeDto.builder()
                    .notTradeQuantity(offerReqDto.getQuantity())
                    .tradeQuantity(0)
                    .tradePrice(0.0)
                    .build();


            return OfferTradeResDto.builder()
                    .order(offerOrderDto)
                    .trade(offerTradeDto).build();
        }else{
            log.info("잔고 충분하여 주문 처리");
            createOffer(id, date.substring(0, 9), offerNum, stock, account, offerReqDto,"buy","PENDING");

        }

        // 4. 체결 정보 저장
        String tradeNum = generateNumber("Trd", date, offerReqDto.getStockCode(), id);
        createTrade(id, tradeNum, offerNum, account.getAcctNo(), offerReqDto);

        // 5. 계좌 잔고 업데이트
        updateAccount(stock);

        // 6. 주문 상태 업데이트
        updateOffer(offerNum, offerReqDto.getQuantity());

        // 7. 체결 정보, 주문 정보 return
        offerOrderDto.setStatus("COMPLETED");
        OfferTradeDto offerTradeDto = OfferTradeDto.builder()
                .tradeNo(tradeNum)
                .tradeQuantity(offerReqDto.getQuantity())
                .notTradeQuantity(0)
                .tradePrice(offerReqDto.getPrice() * offerReqDto.getQuantity())
                .build();


        return OfferTradeResDto.builder()
                .order(offerOrderDto)
                .trade(offerTradeDto).build();

        // 8. 멤버십 정보 업데이트()

    }

    public String placeSellOrder(OfferReqDto offerReqDto, Long id){
        // 0. 요청 들어옴(주문번호 생성, 주문날짜 생성)
        String date = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyMMddHHmmss"));
        String offerNum = generateNumber("Ofr", date, offerReqDto.getStockCode(), id);
        log.info("offer number = {}", offerNum);

        // 1. 계좌 확인(id로)
        AccountResDto account = getAccount(id);
        log.info("get account = {}", account.getAcctNo());

        // 2. 종목 정보 확인
        StocksEntity stock = findByStockCode(offerReqDto.getStockCode());
        log.info("stock info = {}, {}, {}", stock.getStockCode(), stock.getCountry(), stock.getDescription(), stock.getName());

        // 3. 잔고 확인(부족하면 주문상태 failed 처리 후 return) + 주문 상태 처리(PENDING / FAILED)
        if(!checkBalance(stock,account,offerReqDto)){
            log.info("잔고가 부족하여 failed 처리");
            createOffer(id, date.substring(0, 9), offerNum, stock, account, offerReqDto, "buy","FAILED");
            return null;
        }else{
            log.info("잔고 충분하여 주문 처리");
            createOffer(id, date.substring(0, 9), offerNum, stock, account, offerReqDto,"buy","PENDING");

        }

        // 4. 체결 정보 저장
        String tradeNum = generateNumber("Trd", date, offerReqDto.getStockCode(), id);
        createTrade(id, tradeNum, offerNum, account.getAcctNo(), offerReqDto);

        // 5. 계좌 잔고 업데이트
        updateAccount(stock);

        // 6. 주문 상태 업데이트
        updateOffer(offerNum, offerReqDto.getQuantity());

        // 7. 체결 정보, 주문 정보 return
        return "성공이욤";
    }

    // 주문번호 / 체결번호 생성
    public String generateNumber(String type, String date, String stockCode, Long id){
        return type + stockCode + id + date;
    }

    // account 요청(webClient)
    public AccountResDto getAccount(Long id){
        AccountResDto account = webClientAPI.getAccount(id);
        log.info("offerservice account = {}", account.toString());
        return account;
    }

    public StocksEntity findByStockCode(String stockCode){
        return stocksRepository.findByStockCode(stockCode)
                .orElseThrow(() -> CommonException.create("해당하는 종목이 존재하지 않습니다."));
    }

    public Boolean checkBalance(StocksEntity stock, AccountResDto account, OfferReqDto offerReqDto){
        Integer country = stock.getCountry(); // 0 : 한국, 1 : 유럽, 2 : 중국, 3 : 미국
        Double offerReqPrice = offerReqDto.getQuantity() * offerReqDto.getPrice();

        if(country == 0){
            if( account.getWon() >= offerReqPrice){
                return true;
            }
        } else if (country == 1) {
            if( account.getEuro() >= offerReqPrice){
                return true;
            }
        }else if (country == 2) {
            if( account.getYuan() >= offerReqPrice){
                return true;
            }
        }else if (country == 3) {
            if( account.getDollar() >= offerReqPrice){
                return true;
            }
        }
        return false; // false : 잔고 부족, true : 잔고 여유
    }

    public void createOffer(Long id, String date, String offerNum, StocksEntity stock,AccountResDto account, OfferReqDto offerReqDto, String type, String status){
        log.info("주문을 생성합니다");
        Offer newOffer = Offer.builder()
                .id(id)
                .offerNo(offerNum)
                .acctNo(account.getAcctNo())
                .stocks(stock)
                .offerDate(date)
                .type(type)
                .status(status)
                .quantity(offerReqDto.getQuantity())
                .price(offerReqDto.getPrice() * offerReqDto.getQuantity())
                .build();
        log.info("new offer created = {}, {}, {}, {}, {}", newOffer.getOfferNo(),newOffer.getAcctNo(), newOffer.getPrice(), newOffer.getStatus(), newOffer.getType());
        offerRepository.save(newOffer);
        log.info("저장완.");
    }

    public void updateOffer(String offerNum, Integer quantity){
        Offer offer = offerRepository.findByOfferNo(offerNum).orElseThrow(() -> CommonException.create("주문번호에 해당하는 주문 내역이 존재하지 않습니다."));
        offer.setNotTraded(0);
        offer.setTraded(quantity);
        offer.setStatus("COMPLETED");

        offerRepository.save(offer);
        log.info("주문 상태 업데이트 완료 = {}", offer.getStatus());
    }

    public void createTrade(Long id, String tradeNum, String offerNum, String acctNo, OfferReqDto offerReqDto){
        log.info("체결을 시작합니다");
        Trade newTrade = Trade.builder()
                .id(id)
                .tradeNo(tradeNum)
                .offerNo(offerNum)
                .acctNo(acctNo)
                .quantity(offerReqDto.getQuantity())
                .price(offerReqDto.getPrice() * offerReqDto.getQuantity())
                .build();
        log.info("new offer created = {}, {}, {}", newTrade.getOfferNo(),newTrade.getAcctNo(), newTrade.getPrice());
        tradeRepository.save(newTrade);
        log.info("저장완.");
    }

    public void updateAccount(StocksEntity stock){
        // webClient 요청
    }
}
