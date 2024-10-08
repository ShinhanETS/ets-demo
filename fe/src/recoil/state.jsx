import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "persist-atom-key",
  storage: localStorage,
});

// 메인 페이지 탭 (국내, 해외, My거래)
export const mainTabState = atom({
  key: "mainTab",
  default: 0,
});

// 상세 페이지 탭 (상품개요, 차트, 매수, 매도, 관련기사)
export const detailTabState = atom({
  key: "detailTab",
  default: 0,
});

// 차트 데이터
export const chartState = atom({
  key: "chartData",
  default: [],
});

// 멤버십
export const bottomState = atom({
  key: "bottomState",
  default: true,
});

// 멤버쉽 데이터
export const membershipState = atom({
  key: "membership",
  default: {},
});

// 상세보기 할 종목
export const productState = atom({
  key: "productState",
  default: {
    stockCode: "KAU23",
    name: "KAU23",
    description: "한국 탄소 배출권(2023년 만기)",
    chg: "0.5%",
    close: 9150.0,
    currencySymbol: "원",
  },
  effects_UNSTABLE: [persistAtom],
});
