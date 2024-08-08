import { useEffect, useState } from "react";
import ConfirmAlert from "./ConfirmAlert";
import { buyStock, getCharts, sellStock } from "../../apis/DetailApi";
import SimpleChart from "./SimpleChart";
import Loading from "./Loading";
import { useParams } from "react-router-dom";

export default function BuySellContainer({
  isBuy,
  tab,
  close,
  currencySymbol,
}) {
  const [amount, setAmount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [value, setValue] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSell, setIsSell] = useState(false);

  const params = useParams();

  useEffect(() => {
    const stockCode = params.productId;
    const getChart = async () => {
      try {
        const response = await getCharts(stockCode);
        setChartData(response.data);
        setIsLoading(false);
      } catch (error) {
        return;
      }
    };

    getChart();
  }, []);

  useEffect(() => {
    setValue(0);
    setAmount(0);
    setIsError(false);
  }, [tab]);

  const onChange = (e) => {
    setIsError(false);
    // setAmount(e.target.value * price);
    const inputValue = e.target.value.replace(/,/g, "");
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    const parsedValue = numericValue === "" ? 0 : parseInt(numericValue, 10);
    if (isNaN(parsedValue)) {
      setIsError(true);
      setValue(0);
    } else {
      setIsError(false);
      setValue(parsedValue);
      setAmount(parsedValue * close);
    }
  };

  const toBuyStock = async (data) => {
    try {
      const response = await buyStock(data);
      console.log(response);

      if (response.data.order.status === "COMPLETED") {
        setMessage(
          `${response.data.order.stock_code} ${response.data.trade.trade_quantity}주가 체결되었습니다.`
        );
        setIsSuccess(true);
        // submessage {response.data.order.stock_code} {response.data.trade.trade_quantity}주 ({response.data.trade.tradePrice}} 체결되었습니다.
      } else {
        setMessage(response.message);
        setIsSuccess(false);
        // submessage {response.data.message}
      }
      setIsOpen(true);
      setIsSell(false);
    } catch (error) {
      return;
    }
  };

  const toSellStock = async (data) => {
    try {
      const response = await sellStock(data);
      console.log(response);

      if (response.data.order.status === "COMPLETED") {
        setMessage(
          `${response.data.order.stock_code} ${response.data.trade.trade_quantity}주가 판매되었습니다.`
        );
        setIsSuccess(true);
        // submessage
      } else {
        setMessage(response.message);
        setIsSuccess(false);
        // submessage {response.data.message}
      }
      setIsOpen(true);
      setIsSell(true);
    } catch (error) {
      return;
    }
  };

  const onBuy = () => {
    // 매수 로직
    // 사용자가 보유한 금액보다 넘지 않게
    if (amount === 0) {
      // console.log("수량을 입력해주세요.");
      setIsError(true);
      setMessage("수량을 입력해주세요.");
    } else {
      const data = {
        stock_code: params.productId,
        price: close,
        quantity: value,
      };
      toBuyStock(data);
    }
  };

  const onSell = () => {
    // 매도 로직
    // 사용자가 보유한 현황보다 넘지 않게
    if (amount === 0) {
      setIsError(true);
      setMessage("수량을 입력해주세요.");
    } else {
      const data = {
        stock_code: params.productId,
        price: close,
        quantity: value,
      };
      toSellStock(data);
    }
  };

  return (
    <>
      <ConfirmAlert
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        message={message}
        isSuccess={isSuccess}
        isSell={isSell}
      />
      <div className="z-10 h-[calc(100vh_-_244px)] flex flex-col pb-[1.4rem] gap-2 bg-white-1 overflow-x-hidden overflow-y-scroll">
        <div>
          {isLoading ? <Loading /> : <SimpleChart chartData={chartData} />}
        </div>
        <div className="h-[calc(100vh_-_407px)] flex flex-col gap-8 justify-between px-[1.5rem] bg-white-1 text-black">
          <div className="flex flex-col gap-3">
            {/* <div className="w-full bg-[#EDEDED] rounded text-center">시장가</div> */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-col text-[0.9rem]">
                <span>가격</span>
                <div className="flex justify-end gap-1 border border-[#D9D9D9] px-3 py-[10px] rounded">
                  <span>
                    {currencySymbol === "원" ? close.toLocaleString() : close}{" "}
                    {currencySymbol}
                  </span>
                </div>
              </div>
              <div className="flex flex-col text-[0.9rem]">
                <span>수량</span>
                <div className="relative flex items-center">
                  <input
                    className="w-full bg-transparent border border-[#D9D9D9] px-[2.5rem] py-[10px] rounded text-end focus:outline-none"
                    onChange={onChange}
                    value={value === 0 ? "" : value}
                    placeholder="0"
                  />
                  <span className="absolute right-[1.1rem]">주</span>
                </div>
              </div>
              {isError && (
                <span className="text-[0.9rem] text-red-1 text-end">
                  {message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-[1rem]">
              <span>총 금액</span>
              <span>{amount.toLocaleString()}원</span>
            </div>
            {isBuy ? (
              <div
                className="flex w-full items-center justify-center min-h-[3rem] max-h-[3.3rem] bg-[#E81212] text-white-1 rounded-[0.5rem]"
                onClick={onBuy}
              >
                매수
              </div>
            ) : (
              <div
                className="flex w-full items-center justify-center min-h-[3rem] max-h-[3.3rem] bg-[#1141ED] text-white-1 rounded-[0.5rem]"
                onClick={onSell}
              >
                매도
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
