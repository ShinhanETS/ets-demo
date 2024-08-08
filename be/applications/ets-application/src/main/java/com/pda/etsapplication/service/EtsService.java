package com.pda.etsapplication.service;

import com.pda.etsapplication.api.WebClientAPI;
import com.pda.etsapplication.controller.dto.res.StocksDto;
import com.pda.etsapplication.dto.HoldingDto;
import com.pda.etsapplication.dto.MyCurrentDto;
import com.pda.etsapplication.dto.PriceDto;
import com.pda.etsapplication.repository.DescriptionEntity;
import com.pda.etsapplication.repository.DescriptionRepository;
import com.pda.etsapplication.repository.NewsEntity;
import com.pda.etsapplication.repository.NewsRepository;
import com.pda.etsapplication.repository.Offer;
import com.pda.etsapplication.repository.OfferRepository;
import com.pda.etsapplication.repository.PricesEntity;
import com.pda.etsapplication.repository.PricesRepository;
import com.pda.etsapplication.repository.StocksEntity;
import com.pda.etsapplication.repository.StocksRepository;
import com.pda.exceptionutil.exceptions.CommonException;
import com.pda.jwtutil.auth.AuthUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EtsService {
    private final StocksRepository stocksRepository;
    private final PricesRepository pricesRepository;
    private final NewsRepository newsRepository;
    private final DescriptionRepository descriptionRepository;
    private final OfferRepository offerRepository;
    private final WebClientAPI webClientAPI;

    public List<StocksDto> getStocksByCountryAndSector(Integer country, String sector) {
        List<StocksEntity> stocks = stocksRepository.findByCountryAndSector(country, sector);

        List<String> stockCodes = stocks.stream()
                .map(StocksEntity::getStockCode)
                .collect(Collectors.toList());

        List<PricesEntity> prices = pricesRepository.findByStockCodeInAndPriceDate(stockCodes, "20240805");

        List<StocksDto> responseDtos = stocks.stream()
                .map(stock -> {
                    PricesEntity priceInfo = prices.stream()
                            .filter(price -> price.getStockCode().equals(stock.getStockCode()))
                            .findFirst()
                            .orElse(null);

                    String chg = (priceInfo != null) ? priceInfo.getChg() : null;
                    double close = (priceInfo != null) ? priceInfo.getClose() : 0.0;

                    // currencySymbol 설정
                    String currencySymbol;
                    switch (stock.getCurrency()) {
                        case "원":
                            currencySymbol = "원";
                            break;
                        case "유로":
                            currencySymbol = "€";
                            break;
                        case "달러":
                            currencySymbol = "$";
                            break;
                        default:
                            currencySymbol = ""; // 기본값 설정
                    }

                    return new StocksDto(stock.getStockCode(), stock.getName(), stock.getDescription(), chg, close, currencySymbol);
                })
                .collect(Collectors.toList());

        return responseDtos;
    }

    public List<PricesEntity> getPricesByStockCode(String stockCode) {
        return pricesRepository.findByStockCode(stockCode);
    }

    public List<NewsEntity> getNewsByStockCode(String stockCode) {
        if (!stocksRepository.existsByStockCode(stockCode))
            throw CommonException.create("해당 종목이 존재하지 않음");

        List<NewsEntity> news = newsRepository.findAll();
        Collections.shuffle(news);

        return news.subList(0, 20);
    }


    public List<HoldingDto> getHoldingList(List<HoldingDto> holdingDtoList) {
        //String todayDate = new SimpleDateFormat("yyyyMMdd").format(new Date());
        String todayDate = "20240805";
        List<String> stockCodes = holdingDtoList.stream()
            .map(HoldingDto::getStockCode)
            .collect(Collectors.toList());

        List<StocksEntity> stocks = stocksRepository.findByStockCodeIn(stockCodes);

        // 날짜에 맞는 가격 데이터
        Map<String, PricesEntity> pricesMap = new HashMap<>();
        for (String stockCode : stockCodes) {
            List<PricesEntity> pricesEntities = pricesRepository.findByStockCodeAndPriceDate(stockCode, todayDate);
            if (!pricesEntities.isEmpty()) {
                pricesMap.put(stockCode, pricesEntities.get(0)); // 첫 번째 데이터만 사용
            }
        }

        // dto 생성
        for (HoldingDto holdingDto : holdingDtoList) {
            PricesEntity priceEntity = pricesMap.get(holdingDto.getStockCode());
            if (priceEntity != null) {
                StocksEntity stockEntity = stocks.stream()
                    .filter(stock -> stock.getStockCode().equals(holdingDto.getStockCode()))
                    .findFirst()
                    .orElse(null);

                // currencySymbol 설정
                String currencySymbol;
                switch (holdingDto.getCountry()) {
                    case 0:
                        currencySymbol = "원";
                        break;
                    case 1:
                        currencySymbol = "€";
                        break;
                    case 3:
                        currencySymbol = "$";
                        break;
                    default:
                        currencySymbol = ""; // 기본값 설정
                }

                PriceDto priceDto = PriceDto.builder()
                    .name(stockEntity != null ? stockEntity.getName() : null)
                    .description(stockEntity != null ? stockEntity.getDescription() : null)
                    .chg(priceEntity.getChg())
                    .close(priceEntity.getClose())
                    .currencySymbol(currencySymbol)
                    .build();

                holdingDto.setCurrentPrice(priceDto);
            }
        }
        return holdingDtoList;
    }

    public DescriptionEntity getDescription(String stockCode) {
        return descriptionRepository.findByStockCode(stockCode)
            .orElseThrow(() -> CommonException.create("해당 상품 설명이 아직 없음"));
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
