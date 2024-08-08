import { useEffect, useState } from "react";
import ConfirmAlert from "./ConfirmAlert";
import { buyStock, getCharts, sellStock } from "../../apis/DetailApi";
import SimpleChart from "./SimpleChart";
import Loading from "./Loading";

export default function BuySellContainer({ isBuy, price }) {
  const [amount, setAmount] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [value, setValue] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const stockCode = "520043";
    const getChart = async () => {
      try {
        const response = await getCharts(stockCode);
        console.log(response.data.length);
        setChartData(response.data);
        setIsLoading(false);
      } catch (error) {
        return;
      }
    };

    getChart();
    setMessage("CKH25 3주 (289,000원) 체결되었습니다.");
  }, []);

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
      setAmount(parsedValue * 9120);
    }
  };

  const toBuyStock = async (data) => {
    try {
      const response = await buyStock(data);
      console.log(response);

      if (response.data.order.status === "COMPLETED") {
        setMessage("구매가 완료되었습니다.");
        // submessage {response.data.order.stock_code} {response.data.trade.trade_quantity}주 ({response.data.trade.tradePrice}} 체결되었습니다.
      } else {
        setMessage(response.message);
        // submessage {response.data.message}
      }
      setIsOpen(true);
    } catch (error) {
      return;
    }
  };

  const toSellStock = async (data) => {
    try {
      const response = await sellStock(data);
      console.log(response);

      if (response.data.data.order.status === "COMPLETED") {
        setMessage("판매가 완료되었습니다.");
        // submessage
      } else {
        setMessage("판매에 실패했습니다.");
        // submessage {response.data.message}
      }
      setIsOpen(true);
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
        stock_code: "CKH25",
        price: 9850.0,
        quantity: 3,
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
        stock_code: "CKH25",
        price: 9850.0,
        quantity: 3,
      };
      toSellStock(data);
    }
  };

  return (
    <>
      <ConfirmAlert isOpen={isOpen} setIsOpen={setIsOpen} message={message} />
      <div className="z-10 h-[calc(100vh_-_231px)] flex flex-col pb-[1.4rem] gap-2 bg-white-1 overflow-x-hidden overflow-y-scroll">
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
                  {/* <span>{amount}</span> */}
                  <span>9,120</span>
                  <span>원</span>
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
                <span className="text-[0.8rem] text-red-1 text-end">
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
