package com.pda.accountapplication.service;

import com.pda.accountapplication.dto.HoldingDto;
import com.pda.accountapplication.repository.Holding;
import com.pda.accountapplication.repository.HoldingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HoldingService {

    @Autowired
    private HoldingRepository holdingRepository;

    public List<HoldingDto> getHoldingList(Long id){
        List<Holding> holdings = holdingRepository.findAllById(id);
        return holdings.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private HoldingDto convertToDTO(Holding holding) {
        return HoldingDto.builder()
                .stockCode(holding.getStockCode())
                .acctNo(holding.getAccount().getAcctNo())
                .quantity(holding.getQuantity())
                .totalPrice(holding.getTotalPrice())
                .country(holding.getCountry())
                .build();
    }

}
