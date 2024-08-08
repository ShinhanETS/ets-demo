import {atom} from 'recoil'

// 메인 페이지 탭 (국내, 해외, My거래)
export const mainTabState = atom({
    key: 'mainTab',
    default: 0,
})

// 상세 페이지 탭 (상품개요, 차트, 매수, 매도, 관련기사)
export const detailTabState = atom({
    key: 'detailTab',
    default: 0,
})

// 상세보기 할 종목
export const productState = atom({
    key: 'productState',
    default:         
        {
            "name": "KAU23",
            "description": "한국 탄소 배출권(2023년 만기)",
            "chg": "0.5%",
            "close": 9150.0,
            "currencySymbol": "원"
        },
})
