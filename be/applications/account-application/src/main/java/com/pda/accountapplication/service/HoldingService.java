package com.pda.accountapplication.service;

import com.pda.accountapplication.api.WebClientAPI;
import com.pda.accountapplication.dto.HoldingDto;
import com.pda.accountapplication.repository.Holding;
import com.pda.accountapplication.repository.HoldingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class HoldingService {

    @Autowired
    private HoldingRepository holdingRepository;

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


}
