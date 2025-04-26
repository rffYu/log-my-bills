import { useEffect, useRef } from 'react';
import Taro from '@tarojs/taro';
import { View, Canvas } from '@tarojs/components';
import * as d3 from 'd3';

type DayValue = { date: string; value: number };

interface CalendarHeatmapProps {
  month: string; // format: '2025-04'
  data: DayValue[]; // array of { date: 'YYYY-MM-DD', value: number }
  width?: number;
}

const calculateHeight = (month, width) => {
    const [year, mon] = month.split('-').map(Number);
    const startOfMonth = new Date(year, mon - 1, 1);
    const endOfMonth = new Date(year, mon, 0); // last day of month
    const daysInMonth = endOfMonth.getDate();

    const firstDayOfWeek = startOfMonth.getDay(); // 0 (Sun) - 6 (Sat)
    const weeks = Math.ceil((daysInMonth + firstDayOfWeek) / 7);

    const labelHeight = 16;
    return (width / 7) * weeks + labelHeight + 16;
};

const CalendarHeatmap: React.FC<CalendarHeatmapProps> = ({ month, data, width = 400}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasId = 'calendar-chart';

  const drawCalendar = (
    ctx: any,
    month: string,
    data: { date: string; value: number }[]
  ) => {
    const [year, mon] = month.split('-').map(Number);
    const startOfMonth = new Date(year, mon - 1, 1);
    const endOfMonth = new Date(year, mon, 0); // last day of month
    const daysInMonth = endOfMonth.getDate();

    const firstDayOfWeek = startOfMonth.getDay(); // 0 (Sun) - 6 (Sat)
    const weeks = Math.ceil((daysInMonth + firstDayOfWeek) / 7);

    const labelHeight = 16;
    const computedHeight = (width / 7) * weeks + labelHeight + 16;

    // Calculate cell sizes
    const cellPadding = 4;
    const cellSize =
    Math.min(
      Math.floor((width - cellPadding * 6) / 7),
      Math.floor((computedHeight - cellPadding * (weeks - 1)) / weeks)
    );

    // Build a map for quick lookup
    const valueMap = new Map(data.map((d) => [d.date, d.value]));
    const maxValue = Math.max(...data.map((d) => d.value), 1);

    const dayLabels = ['日', '一', '二', '三', '四', '五', '六'];

    // Drawing
    if (ctx.save) ctx.save();
    if (ctx.clearRect) ctx.clearRect(0, 0, width, computedHeight);
    if (ctx.translate) ctx.translate(0, 0);

    // Draw day labels
    for (let day = 0; day < 7; day++) {
      const x = day * (cellSize + cellPadding);
      if (ctx.setFillStyle) ctx.setFillStyle('#888');
        else ctx.fillStyle = '#888';
      if (ctx.setFontSize) ctx.setFontSize(12);
        else ctx.font = '12px Arial';
      ctx.fillText(dayLabels[day], x + cellSize * 0.1, labelHeight - 2);
    }

    let dayNum = 1;
    for (let week = 0; week < weeks; week++) {
      for (let day = 0; day < 7; day++) {
        // Calculate real date
        const gridPos = week * 7 + day;
        if (gridPos < firstDayOfWeek || dayNum > daysInMonth) continue;

        const x = day * (cellSize + cellPadding);
        const y = week * (cellSize + cellPadding) + labelHeight;

        const dateStr = `${year}-${mon.toString().padStart(2, '0')}-${dayNum
                                                                      .toString()
                                                                      .padStart(2, '0')}`;
        const val = valueMap.get(dateStr) || 0;

        // Use D3 color scheme
        const fillColor =
          maxValue === 0 ? '#eee' : d3.interpolateBlues(val / maxValue);

        if (ctx.setFillStyle) ctx.setFillStyle(fillColor);
          else ctx.fillStyle = fillColor;

        ctx.fillRect(x, y, cellSize, cellSize);

        // Draw day label
        if (ctx.setFillStyle) ctx.setFillStyle('#999');
          else ctx.fillStyle = '#999';

        if (ctx.setFontSize) ctx.setFontSize(10);
          else ctx.font = '10px Arial';

        ctx.fillText(
          dayNum.toString(),
          x + cellSize * 0.25,
          y + cellSize * 0.65
        );

        dayNum++;
      }
    }

    if (ctx.draw) ctx.draw(); // for MiniApp
    if (ctx.restore) ctx.restore();
  }

  useEffect(() => {
    const env = Taro.getEnv();

    if (env === Taro.ENV_TYPE.WEAPP || env === Taro.ENV_TYPE.ALIPAY) {
      const query = Taro.createSelectorQuery();
      query
        .select(`#${canvasId}`)
        .fields({ node: true, size: true })
        .exec((res) => {
          const canvas = res[0].node;
          const ctx = canvas.getContext('2d');
          const dpr = Taro.getSystemInfoSync().pixelRatio || 1;
          const height = calculateHeight(month, width);
          canvas.width = res[0].width * dpr;
          canvas.height = height * dpr;
          ctx.scale(dpr, dpr);

          drawCalendar(ctx, month, data);
        });
    } else if (env === Taro.ENV_TYPE.WEB) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const height = calculateHeight(month, width);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        if (ctx) drawCalendar(ctx, month, data);
      }
    }
  }, [month, data, width]);

  return (
    Taro.getEnv() === Taro.ENV_TYPE.WEAPP ? (
      <Canvas
        type='2d'
        canvasId={canvasId}
        id={canvasId}
        style={`width: ${width}px; height: ${calculateHeight(month, width)}px; background-color: #f9f9f9;`}
      />
    ) : (
        <canvas
          ref={canvasRef}
          id={canvasId}
          style={{
            backgroundColor: '#f9f9f9',
            width: `${width}px`,
            height: `${calculateHeight(month, width)}px`
          }}
        />
      )
  );
};

export default CalendarHeatmap;

