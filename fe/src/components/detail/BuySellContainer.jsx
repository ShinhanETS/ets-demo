import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { useEffect, useState } from "react";
import {
  CandlestickSeries,
  Chart,
  ChartCanvas,
  CrossHairCursor,
  discontinuousTimeScaleProviderBuilder,
  EdgeIndicator,
  HoverTooltip,
  lastVisibleItemBasedZoomAnchor,
  MouseCoordinateX,
  MouseCoordinateY,
  XAxis,
  YAxis,
} from "react-financial-charts";
import { initialData } from "./data";
import { useRecoilState } from "recoil";
import { chartState } from "../../recoil/state";
import ConfirmAlert from "./ConfirmAlert";

export default function BuySellContainer({ isBuy, price }) {
  const [amount, setAmount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const chartData = initialData;
  // const [chartData, setChartData] = useRecoilState(chartState);

  // useEffect(() => {
  //   setChartData(initialData?.reverse());
  // }, []);

  const onChange = (e) => {
    setAmount(e.target.value * 9120);
    setIsError(false);
    // setAmount(e.target.value * price);
  };

  const onBuy = () => {
    // 매수 로직
    if (amount === 0) {
      // console.log("수량을 입력해주세요.");
      setIsError(true);
      setMessage("수량을 입력해주세요.");
    } else {
      setMessage("구매가 완료되었습니다.");
    }
  };

  const onSell = () => {
    // 매도 로직
    if (amount === 0) {
      setIsError(true);
      setMessage("수량을 입력해주세요.");
    } else {
      setMessage("판매가 완료되었습니다.");
    }
  };

  // const chartData = useRecoilValue(chartState);
  // const chartData = initialData.reverse();

  // const ScaleProvider =
  //   discontinuousTimeScaleProviderBuilder().inputDateAccessor((d) => {
  //     const year = d?.date?.substr(0, 4);
  //     const month = d?.date?.substr(4, 2);
  //     const day = d?.date?.substr(6, 2);
  //     const nDate = `${year}-${month}-${day}`;
  //     return new Date(nDate);
  //   });
  const ScaleProvider =
    discontinuousTimeScaleProviderBuilder().inputDateAccessor(
      (d) => new Date(d.date)
    );

  // const height = window.innerHeight - 266;
  const height = 180;
  const width = window.innerWidth;
  const margin = { left: 0, right: 48, top: 0, bottom: 24 };

  const { data, xScale, xAccessor, displayXAccessor } =
    ScaleProvider(chartData);
  const pricesDisplayFormat = format(",");

  const start = xAccessor(data[data.length - 1]);
  const end = xAccessor(data[data.length - 31]);
  const xExtents = [start, data.length < 31 ? xAccessor(data[0]) : end];

  const gridHeight = height - margin.top - margin.bottom;

  const chartHeight = gridHeight;

  const dateTimeFormat = "%Y/%m";
  const timeDisplayFormat = timeFormat(dateTimeFormat);

  const hoverTimeFormat = "%Y년 %m월 %d일";
  const HoverDisplayFormat = timeFormat(hoverTimeFormat);

  const candleChartExtents = (data) => {
    return [data.high, data.low];
  };

  const yEdgeIndicator = (data) => {
    return data.close;
  };
  const openCloseColor = (data) => {
    return data?.close > data?.open ? "#ef5350" : "#26a69a";
  };

  function tooltipContent() {
    return ({ currentItem, xAccessor }) => {
      return {
        x: HoverDisplayFormat(xAccessor(currentItem)),
        y: [
          {
            label: "시가",
            value: currentItem?.open && pricesDisplayFormat(currentItem?.open),
          },
          {
            label: "종가",
            value:
              currentItem?.close && pricesDisplayFormat(currentItem?.close),
          },
          {
            label: "고가",
            value: currentItem?.high && pricesDisplayFormat(currentItem?.high),
          },
          {
            label: "저가",
            value: currentItem?.low && pricesDisplayFormat(currentItem?.low),
          },
          {
            label: "거래량",
            value:
              currentItem?.volume && pricesDisplayFormat(currentItem?.volume),
          },
        ],
      };
    };
  }

  return (
    <>
      <ConfirmAlert isOpen={isOpen} setIsOpen={setIsOpen} message={message} />
      <div className="z-10 h-[calc(100vh_-_222px)] flex flex-col pb-[1.4rem] gap-2 bg-white-1 overflow-x-hidden overflow-y-scroll">
        <div>
          <ChartCanvas
            height={height}
            ratio={3}
            width={width}
            margin={margin}
            data={data}
            displayXAccessor={displayXAccessor}
            seriesName="Data"
            xScale={xScale}
            xAccessor={xAccessor}
            xExtents={xExtents}
            zoomAnchor={lastVisibleItemBasedZoomAnchor}
          >
            <Chart
              id={1}
              height={chartHeight}
              yExtents={candleChartExtents}
              padding={10}
            >
              <HoverTooltip
                tooltip={{ content: tooltipContent() }}
                fontSize={14}
                toolTipStrokeStyle="#bababa"
                toolTipFillStyle="#fff"
                background={{
                  fillStyle: "rgba(0, 0, 0, 0.02)",
                  strokeStyle: "ShortDash2",
                }}
                yAccessor={(d) => d.volume}
              />
              <XAxis
                showGridLines
                showTickLabel={true}
                tickStrokeStyle="#BABABA"
                strokeStyle="#BABABA"
                tickLabelFill="#A9A9A9"
                gridLinesStrokeWidth={0.2}
                tickStrokeWidth={0.2}
                strokeWidth={0.02}
                // tickFormat={timeDisplayFormat}
              />
              <YAxis
                showGridLines
                tickFormat={pricesDisplayFormat}
                tickStrokeStyle="#BABABA"
                strokeStyle="#BABABA"
                tickLabelFill="#A9A9A9"
              />
              <CandlestickSeries
                fill={openCloseColor}
                wickStroke={openCloseColor}
              />
              <MouseCoordinateX displayFormat={timeDisplayFormat} />
              <MouseCoordinateY
                rectWidth={margin.right}
                displayFormat={pricesDisplayFormat}
              />
              <EdgeIndicator
                itemType="last"
                rectWidth={margin.right}
                fill={openCloseColor}
                lineStroke={openCloseColor}
                displayFormat={pricesDisplayFormat}
                yAccessor={yEdgeIndicator}
                fullWidth={true}
              />
            </Chart>
          </ChartCanvas>
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
                  />
                  <span className="absolute right-[1.1rem]">개</span>
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
