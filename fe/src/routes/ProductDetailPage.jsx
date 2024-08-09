import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoContainer from "../components/detail/InfoContainer";
import SelectTab from "../components/detail/SelectTab";
import ProductDescription from "../components/detail/ProductDescription";
import ChartContainer from "../components/detail/ChartContainer";
import BuySellContainer from "../components/detail/BuySellContainer";
import ArticleContainer from "../components/detail/ArticleContainer";
import Back from "../components/detail/Back";
import { useRecoilState } from "recoil";
import { bottomState, productState } from "../recoil/state";

export default function ProductDetail() {
  const { productId } = useParams();
  const options = ["상품개요", "차트", "매수", "매도", "관련기사"];
  const [tab, setTab] = useState(0);
  const [isBottom, setIsBottom] = useRecoilState(bottomState);
  const detailData = useRecoilState(productState);
  let { name, description, currencySymbol, close, chg } = detailData[0];

  useEffect(() => {
    setIsBottom(false);
  }, []);

  return (
    <div className="h-full bg-white-1">
      <Back />
      <InfoContainer
        name={name}
        description={description}
        currencySymbol={currencySymbol}
        close={close}
        chg={chg}
      />
      <SelectTab options={options} tab={tab} setTab={setTab} />
      {tab === 0 ? (
        <ProductDescription />
      ) : tab === 1 ? (
        <ChartContainer />
      ) : tab === 2 ? (
        <BuySellContainer
          isBuy={true}
          tab={tab}
          close={close}
          currencySymbol={currencySymbol}
        />
      ) : tab === 3 ? (
        <BuySellContainer
          isBuy={false}
          tab={tab}
          close={close}
          currencySymbol={currencySymbol}
        />
      ) : (
        <ArticleContainer />
      )}
    </div>
  );
}
