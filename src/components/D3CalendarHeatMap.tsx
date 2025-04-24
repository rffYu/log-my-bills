import { useEffect, useRef } from 'react';
import Taro from '@tarojs/taro';
import { View, Canvas } from '@tarojs/components';
import * as d3 from 'd3';

type DayValue = { date: string; value: number };

interface CalendarHeatmapProps {
  month: string; // format: '2025-04'
  data: DayValue[]; // array of { date: 'YYYY-MM-DD', value: number }
  width?: number;
  height?: number;
}

const CalendarHeatmap: React.FC<CalendarHeatmapProps> = ({ month, data, width = 600, height = 150 }) => {
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

    // Calculate cell sizes
    const cellPadding = 4;
    const cellSize =
    Math.min(
      Math.floor((width - cellPadding * 6) / 7),
      Math.floor((height - cellPadding * (weeks - 1)) / weeks)
    );

    // Build a map for quick lookup
    const valueMap = new Map(data.map((d) => [d.date, d.value]));
    const maxValue = Math.max(...data.map((d) => d.value), 1);

    const dayLabels = ['日', '一', '二', '三', '四', '五', '六'];
    const labelHeight = 16;

    // Drawing
    if (ctx.save) ctx.save();
    if (ctx.clearRect) ctx.clearRect(0, 0, width, height);
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

    if (env === Taro.ENV_TYPE.WEAPP) {
      const ctx = wx.createCanvasContext(canvasId, this as any);
      drawCalendar(ctx, month, data);
    } else if (env === Taro.ENV_TYPE.WEB) {
      const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) drawCalendar(ctx, month, data);
      }
    }
  }, [month, data]);

  return (
    <View className="p-4">
      {Taro.getEnv() === Taro.ENV_TYPE.WEB ? (
        <canvas
          ref={canvasRef}
          id={canvasId}
          width={320}
          height={180}
          style={{ backgroundColor: '#f9f9f9', width: '100%' }}
        />
      ) : (
          <Canvas
            canvasId={canvasId}
            id={canvasId}
            style={`width: ${width}px; height: ${height}px; background-color: #f9f9f9;`}
          />
        )}
      </View>
  );
};

export default CalendarHeatmap;

