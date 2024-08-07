package com.pda.etsapplication.service;

import com.pda.etsapplication.repository.NewsEntity;
import com.pda.etsapplication.repository.NewsRepository;
import com.pda.etsapplication.repository.PricesEntity;
import com.pda.etsapplication.repository.PricesRepository;
import com.pda.etsapplication.repository.StocksEntity;
import com.pda.etsapplication.repository.StocksRepository;
import com.pda.exceptionutil.exceptions.CommonException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EtsService {
    private final StocksRepository stocksRepository;
    private final PricesRepository pricesRepository;
    private final NewsRepository newsRepository;

    public List<StocksEntity> getStocksByCountryAndSector(Integer country, String sector) {
        return stocksRepository.findByCountryAndSector(country, sector);
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
}
