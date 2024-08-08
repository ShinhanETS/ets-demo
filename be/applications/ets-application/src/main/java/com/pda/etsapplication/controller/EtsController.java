package com.pda.etsapplication.controller.dto.req;

import com.pda.apiutil.ApiUtil;
import com.pda.apiutil.GlobalResponse;
import com.pda.etsapplication.repository.NewsEntity;
import com.pda.etsapplication.repository.PricesEntity;
import com.pda.etsapplication.repository.StocksEntity;
import com.pda.etsapplication.service.EtsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequiredArgsConstructor
public class EtsController {
    private final EtsService etsService;
    private final OfferService offerService;

    @GetMapping("/{country}/{sector}")
    public GlobalResponse<List<StocksDto>> getStocks(@PathVariable Integer country, @PathVariable String sector) {
        List<StocksDto> stocks = etsService.getStocksByCountryAndSector(country, sector);

        return ApiUtil.success("종목 데이터", stocks);
    }

    @GetMapping("/stock/{stockCode}")
    public GlobalResponse<List<PricesEntity>> getPricesByStockCode(@PathVariable String stockCode) {
        List<PricesEntity> prices = etsService.getPricesByStockCode(stockCode);
//        if (prices.isEmpty()) {
//            return ApiUtil.exception("데이터가 없습니다."); // 데이터가 없을 경우 404 응답
//        }
        return ApiUtil.success("종목의 가격 데이터", prices); // 데이터가 있을 경우 200 응답과 데이터 반환
    }

    // 주문(매수)
    @Authenticated
    @PostMapping("/stock/buy")
    public GlobalResponse<OfferTradeResDto> createBuyOffer(@AuthInfo AuthUser authUser, @RequestBody OfferReqDto offerReqDto){

        OfferTradeResDto offer = offerService.placeBuyOrder(offerReqDto, authUser.getId());
        if (offer.getOrder().getStatus().equals("FAILED")) {
            return ApiUtil.success("잔고 부족으로 주문 및 체결 실패", offer);
        }
        return ApiUtil.success("주문 및 체결 성공", offer);
    }

    // 매도
    @PostMapping("/stock/sell")
    public GlobalResponse<OfferTradeResDto> createSellOffer(@AuthInfo AuthUser authUser, @RequestBody OfferReqDto offerReqDto){
        OfferTradeResDto offer = offerService.placeSellOrder(offerReqDto, authUser.getId());

        return ApiUtil.success("주문 및 체결 성공", offer);
    }

    @GetMapping("/stock/{stockCode}/news")
    public GlobalResponse<List<NewsEntity>> getNewsByStockCode(@PathVariable String stockCode) {
        return ApiUtil.success("뉴스 가져오기 성공", etsService.getNewsByStockCode(stockCode));
    }
}



