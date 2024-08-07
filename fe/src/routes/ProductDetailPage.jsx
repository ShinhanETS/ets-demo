import { useState } from "react";
import { useParams } from "react-router-dom";
import Back from "../components/Back";
import InfoContainer from "../components/detail/InfoContainer";
import SelectTab from "../components/detail/SelectTab";
import ProductDescription from "../components/detail/ProductDescription";
import ChartContainer from "../components/detail/ChartContainer";
import BuySellContainer from "../components/detail/BuySellContainer";
import ArticleContainer from "../components/detail/ArticleContainer";

export default function ProductDetail() {
  const { productId } = useParams();
  const options = ["상품개요", "차트", "매수", "매도", "관련기사"];
  const [tab, setTab] = useState(0);

  return (
    <div className="h-full bg-white">
      <Back />
      <InfoContainer />
      <SelectTab options={options} tab={tab} setTab={setTab} />
      {tab === 0 ? (
        <ProductDescription />
      ) : tab === 1 ? (
        <ChartContainer />
      ) : tab === 2 ? (
        <BuySellContainer isBuy={true} />
      ) : tab === 3 ? (
        <BuySellContainer isBuy={false} />
      ) : (
        <ArticleContainer />
      )}
    </div>
  );
}
