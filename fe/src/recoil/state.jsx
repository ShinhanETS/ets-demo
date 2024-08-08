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
