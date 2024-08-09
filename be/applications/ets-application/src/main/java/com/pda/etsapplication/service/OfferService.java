package com.pda.etsapplication.service;

import com.pda.etsapplication.api.WebClientAPI;
import com.pda.etsapplication.dto.*;
import com.pda.etsapplication.repository.*;
import com.pda.exceptionutil.exceptions.CommonException;
import com.pda.jwtutil.auth.AuthUser;
import com.pda.kafkautil.KafkaJson;
import com.pda.kafkautil.TradeKafkaDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class OfferService {

    private final StocksRepository stocksRepository;

    private final OfferRepository offerRepository;

    private final TradeRepository tradeRepository;
    private final PricesRepository pricesRepository;

    private final WebClientAPI webClientAPI;
    private final KafkaTemplate<String, KafkaJson> kafkaTemplate;

    public OfferTradeResDto placeBuyOrder(OfferReqDto offerReqDto, AuthUser authUser) {
        Long id = authUser.getId();
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

        // dto 주문 객체 생성s
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
        updateAccount(authUser, stock, false, offerReqDto.getPrice(), offerReqDto.getQuantity());

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

        MyCurrentDto myCurrentDto = getMyCurrent(authUser);
        kafkaTemplate.send("update-trade", TradeKafkaDto.builder()
            .userId(authUser.getId())
            .price(offerReqDto.getPrice())
            .quantity(offerReqDto.getQuantity())
            .stockCode(stock.getStockCode())
            .stockName(stock.getName())
            .totalKRWAmount(myCurrentDto.getStockAmount().doubleValue())
            .totalTradeAmount(myCurrentDto.getOfferAmount())
            .tradeDate(LocalDateTime.now())
            .tradeType("매수")
            .build());

        return OfferTradeResDto.builder()
                .order(offerOrderDto)
                .trade(offerTradeDto).build();

        // 8. 멤버십 정보 업데이트()

    }

    public OfferTradeResDto placeSellOrder(OfferReqDto offerReqDto, AuthUser authUser){
        Long id = authUser.getId();
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


        // 매수했는데 돈이 오름
        // dto 주문 객체 생성
        OfferOrderDto offerOrderDto =
                OfferOrderDto.builder()
                        .acctNo(account.getAcctNo())
                        .stockCode(stock.getStockCode())
                        .offerQuantity(offerReqDto.getQuantity())
                        .offerDate(date.substring(0, 9))
                        .type("sell")
                        .offerNo(offerNum)
                        .build();

        // 3. 주문 처리(PENDING)
        createOffer(id, date.substring(0, 9), offerNum, stock, account, offerReqDto,"sell","PENDING");

        // 4. 체결 정보 저장
        String tradeNum = generateNumber("Trd", date, offerReqDto.getStockCode(), id);
        createTrade(id, tradeNum, offerNum, account.getAcctNo(), offerReqDto);

        // 5. 계좌 잔고 업데이트
        updateAccount(authUser, stock, true, offerReqDto.getPrice(), offerReqDto.getQuantity());

        // 6. 주문 상태 업데이트
        updateOffer(offerNum, offerReqDto.getQuantity());

        offerOrderDto.setStatus("COMPLETED");
        OfferTradeDto offerTradeDto = OfferTradeDto.builder()
                .tradeNo(tradeNum)
                .tradeQuantity(offerReqDto.getQuantity())
                .notTradeQuantity(0)
                .tradePrice(offerReqDto.getPrice() * offerReqDto.getQuantity())
                .build();

        MyCurrentDto myCurrentDto = getMyCurrent(authUser);
        kafkaTemplate.send("update-trade", TradeKafkaDto.builder()
            .userId(authUser.getId())
            .price(offerReqDto.getPrice())
            .quantity(offerReqDto.getQuantity())
            .stockCode(stock.getStockCode())
            .stockName(stock.getName())
            .totalKRWAmount(myCurrentDto.getStockAmount().doubleValue())
            .totalTradeAmount(myCurrentDto.getOfferAmount())
            .tradeDate(LocalDateTime.now())
            .tradeType("매도")
            .build());

        // 7. 체결 정보, 주문 정보 return
        return OfferTradeResDto.builder()
                .order(offerOrderDto)
                .trade(offerTradeDto).build();
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
        String currency = stock.getCurrency(); // 0 : 한국, 1 : 유럽, 2 : 중국, 3 : 미국
        Double offerReqPrice = offerReqDto.getQuantity() * offerReqDto.getPrice();

        if(currency.equals("원")){
            if( account.getWon() >= offerReqPrice){
                return true;
            }
        } else if (currency.equals("유로")) {
            if( account.getEuro() >= offerReqPrice){
                return true;
            }
        }else if (currency.equals("위안")) {
            if( account.getYuan() >= offerReqPrice){
                return true;
            }
        }else if (currency.equals("달러")) {
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

    public void updateAccount(AuthUser authUser, StocksEntity stock, boolean isMinus, Double nowPrice, Integer quantity){
        // webClient 요청
        webClientAPI.putHolding(authUser, PutHoldingDto.builder()
                .trType(isMinus?"매도":"매수")
                .stockCode(stock.getStockCode())
                .stockType(stock.getSector())
                .nowPrice(nowPrice)
                .currency(stock.getCurrency())
                .quantity(quantity)
                .country(stock.getCountry())
            .build());
    }

    public MyCurrentDto getMyCurrent(AuthUser authUser) {
        List<Offer> offers = offerRepository.findAllByStatusAndOfferDateStartsWithAndId("COMPLETED", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyMM")), authUser.getId());
        Double offerAmount = 0D;
        // 0 : 한국, 1 : 유럽, 2 : 중국, 3 : 미국
        for (Offer offer : offers) {
            if (offer.getStocks().getCountry().equals(0)) {
                offerAmount += offer.getPrice();
            } else if (offer.getStocks().getCountry().equals(1)) {
                offerAmount += offer.getPrice()*1500d;
            } else if (offer.getStocks().getCountry().equals(2)) {
                offerAmount += offer.getPrice()*200d;
            } else if (offer.getStocks().getCountry().equals(3)) {
                offerAmount += offer.getPrice()*1300d;
            }
        }

        Double stockAmount = 0D;
        List<HoldingDto> holdings = webClientAPI.getHoldings(authUser.getToken());
        for(HoldingDto holding: holdings) {
            PricesEntity price = pricesRepository.findByStockCodeByCurrent(holding.getStockCode());
            if (holding.getCountry().equals(0)) {
                stockAmount += price.getClose()*holding.getQuantity();
            } else if (holding.getCountry().equals(1)) {
                stockAmount += price.getClose()*holding.getQuantity()*1500d;
            } else if (holding.getCountry().equals(2)) {
                stockAmount += price.getClose()*holding.getQuantity()*200d;
            } else if (holding.getCountry().equals(3)) {
                stockAmount += price.getClose()*holding.getQuantity()*1300d;
            }
        }
        return MyCurrentDto.builder()
            .offerAmount(offerAmount.longValue())
            .stockAmount(stockAmount.longValue())
            .build();
    }
}
