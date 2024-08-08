package com.pda.etsapplication.service;

import com.pda.etsapplication.api.WebClientAPI;
import com.pda.etsapplication.dto.AccountResDto;
import com.pda.etsapplication.dto.OfferReqDto;
import com.pda.etsapplication.repository.PricesEntity;
import com.pda.etsapplication.repository.PricesRepository;
import com.pda.etsapplication.repository.StocksEntity;
import com.pda.etsapplication.repository.StocksRepository;
import com.pda.exceptionutil.exceptions.CommonException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EtsService {
    private final StocksRepository stocksRepository;
    private final PricesRepository pricesRepository;


    public List<StocksEntity> getStocksByCountryAndSector(Integer country, String sector) {
        return stocksRepository.findByCountryAndSector(country, sector);
    }

    public List<PricesEntity> getPricesByStockCode(String stockCode) {
        return pricesRepository.findByStockCode(stockCode);
    }


}
