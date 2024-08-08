import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
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

export default function SimpleChart({ chartData }) {
  const ScaleProvider =
    discontinuousTimeScaleProviderBuilder().inputDateAccessor((d) => {
      const year = d?.priceDate?.substr(0, 4);
      const month = d?.priceDate?.substr(4, 2);
      const day = d?.priceDate?.substr(6, 2);
      const nDate = `${year}-${month}-${day}`;
      return new Date(nDate);
    });

  const height = (window.innerHeight - 222) / 2.5;
  // const height = 220;
  const width = window.innerWidth;
  const margin = { left: 8, right: 42, top: 0, bottom: 24 }; // 해외
  // const margin = { left: 8, right: 48, top: 0, bottom: 24 }; // 국내

  const { data, xScale, xAccessor, displayXAccessor } =
    ScaleProvider(chartData);
  const pricesDisplayFormat = format(".1f"); // 해외
  // const pricesDisplayFormat = format(","); // 국내

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
          tickStrokeStyle="#BABABA"
          strokeStyle="#BABABA"
          showTicks={true}
          showTickLabel={true}
        />
        <YAxis
          showGridLines
          tickFormat={pricesDisplayFormat}
          tickStrokeStyle="#BABABA"
          strokeStyle="#BABABA"
          tickLabelFill="#A9A9A9"
        />
        <CandlestickSeries fill={openCloseColor} wickStroke={openCloseColor} />
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
  );
}
