import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  BarSeries,
  CandlestickSeries,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
  HoverTooltip,
  SingleValueTooltip,
} from "react-financial-charts";
import { useEffect, useState } from "react";
import { getCharts } from "../../apis/DetailApi";
import Loading from "./Loading";
import { useParams } from "react-router-dom";

export default function ChartContainer({ nowPrice }) {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  const params = useParams();

  useEffect(() => {
    const stockCode = params.productId;
    const getChart = async () => {
      try {
        const response = await getCharts(stockCode);
        // console.log(response.data);
        setChartData(response.data);
        setIsLoading(false);
      } catch (error) {
        return;
      }
    };

    getChart();
  }, []);

  const ScaleProvider =
    discontinuousTimeScaleProviderBuilder().inputDateAccessor((d) => {
      const year = d?.priceDate?.substr(0, 4);
      const month = d?.priceDate?.substr(4, 2);
      const day = d?.priceDate?.substr(6, 2);
      const nDate = `${year}-${month}-${day}`;
      return new Date(nDate);
    });

  const height = window.innerHeight - 264;
  const width = window.innerWidth;
  const margin = { left: 0, right: 48, top: 0, bottom: 24 };

  const { data, xScale, xAccessor, displayXAccessor } =
    ScaleProvider(chartData);
  const pricesDisplayFormat = format(".1f");
  // const pricesDisplayFormat = format(",");
  const volumeDisplayFormat = format("~s");

  const start = xAccessor(data[data.length - 1]);
  const end = xAccessor(data[data.length - 61]);
  const xExtents = [start, data.length < 61 ? xAccessor(data[0]) : end];

  const gridHeight = height - margin.top - margin.bottom;

  const barChartHeight = gridHeight / 4;

  const barChartOrigin = (_, h) => [0, gridHeight - barChartHeight];

  const chartHeight = gridHeight - barChartHeight;

  const yExtents = (data) => {
    return [data.high, data.low];
  };
  const dateTimeFormat = "%Y/%m";
  const timeDisplayFormat = timeFormat(dateTimeFormat);

  const hoverTimeFormat = "%Y년 %m월 %d일";
  const HoverDisplayFormat = timeFormat(hoverTimeFormat);

  const barChartExtents = (data) => {
    return data.volume;
  };

  const candleChartExtents = (data) => {
    return [data.high, data.low];
  };

  const yEdgeIndicator = (data) => {
    return data.close;
  };

  const volumeColor = (data) => {
    return data?.close > data?.open
      ? "rgba(239, 83, 80, 0.6)"
      : "rgba(38, 166, 154, 0.6)";
  };

  const volumeSeries = (data) => {
    return data.volume;
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
      {isLoading ? (
        <Loading />
      ) : chartData?.length > 0 ? (
        <div className="bg-white-1">
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
              padding={50}
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
                showTickLabel={false}
                tickStrokeStyle="#BABABA"
                strokeStyle="#BABABA"
              />
              <YAxis
                showGridLines
                tickFormat={pricesDisplayFormat}
                tickStrokeStyle="#BABABA"
                strokeStyle="#BABABA"
                tickLabelFill="#BABABA"
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
            <Chart
              id={2}
              height={barChartHeight}
              origin={barChartOrigin}
              yExtents={barChartExtents}
              padding={{ top: 40, bottom: 0 }}
            >
              <SingleValueTooltip
                yLabel="거래량"
                origin={[12, 20]}
                yAccessor={(d) => d.volume}
                yDisplayFormat={(vol) => vol.toLocaleString()}
              />
              <XAxis
                showGridLines
                tickStrokeStyle="#BABABA"
                strokeStyle="#BABABA"
                showTicks={true}
                showTickLabel={true}
              />
              <YAxis
                ticks={4}
                tickFormat={volumeDisplayFormat}
                tickLabelFill="#BABABA"
                tickStrokeStyle="#BABABA"
                strokeStyle="#BABABA"
              />
              <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
            </Chart>
            <CrossHairCursor />
          </ChartCanvas>
        </div>
      ) : (
        <div className="w-full h-[30vh] box-border flex justify-center items-center text-gray-dark">
          차트 정보가 없습니다.
        </div>
      )}
    </>
  );
}
