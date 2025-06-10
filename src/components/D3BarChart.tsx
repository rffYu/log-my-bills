import React, { useEffect, useRef } from 'react';
import Taro from '@tarojs/taro';
import { Canvas, View } from '@tarojs/components';
import * as d3 from 'd3';

interface DataItem {
  x: string;
  y: number;
}

interface Props {
  data: DataItem[];
  width?: number;
  height?: number;
  canvasId?: string;
  color?: string
}

const BarChart: React.FC<Props> = ({ data, width = 300, height = 200, canvasId = 'bar-canvas', color = ''}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const env = Taro.getEnv();
    if (env === Taro.ENV_TYPE.WEAPP) {
      const query = Taro.createSelectorQuery();
      query
        .select(`#${canvasId}`)
        .fields({ node: true, size: true })
        .exec((res) => {
          const canvas = res[0].node;
          const ctx = canvas.getContext('2d');
          const dpr = Taro.getSystemInfoSync().pixelRatio;
          canvas.width = res[0].width * dpr;
          canvas.height = res[0].height * dpr;
          ctx.scale(dpr, dpr);
          drawChart(ctx, res[0].width, res[0].height, color);
        });
    } else {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        drawChart(ctx, width, height, color);
      }
    }
  }, [data]);

  const drawChart = (ctx: CanvasRenderingContext2D, w: number, h: number, color: string='') => {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = w - margin.left - margin.right;
    const innerHeight = h - margin.top - margin.bottom;

    const xValues = Array.from(new Set(data.map((d) => d.x)));
    const xScale = d3.scaleBand().domain(xValues).range([0, innerWidth]).padding(0.1);
    const yMax = d3.max(data, (d) => d.y) || 0;
    const yScale = d3.scaleLinear().domain([0, yMax]).range([innerHeight, 0]);

    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(margin.left, margin.top);

    data.forEach((d, i) => {
      const x = xScale(d.x) || 0;
      const y = yScale(d.y);
      const barHeight = innerHeight - y;
      if (color) {
        ctx.fillStyle = color;
      } else {
        ctx.fillStyle = d3.interpolateViridis(i / data.length);
      }
      ctx.fillRect(x, y, xScale.bandwidth(), barHeight);
    });

    ctx.fillStyle = '#000';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';

    // X-axis ticks and labels
    xValues.forEach((xVal) => {
      const x = (xScale(xVal) || 0) + xScale.bandwidth() / 2;
      ctx.fillText(xVal.toString(), x, innerHeight + 15); // below bars
    });

    // Y-axis ticks and labels
    const yTicks = yScale.ticks(5);
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    yTicks.forEach((tick) => {
      const y = yScale(tick);
      ctx.fillText(tick.toString(), -5, y);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(innerWidth, y);
      ctx.strokeStyle = '#eee';
      ctx.stroke();
    });

    ctx.restore();

    // Axis labels
    ctx.save();
    ctx.fillStyle = '#000';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';

    // Y Axis Label (rotate for vertical text)
    ctx.translate(15, margin.top + innerHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.restore();
  };

  return (
    Taro.getEnv() === Taro.ENV_TYPE.WEAPP ? (
      <Canvas type="2d" id={canvasId} canvasId={canvasId} style={{ width: `${width}px`, height: `${height}px` }} />
    ) : (
        <canvas ref={canvasRef} id={canvasId} style={{ width: `${width}px`, height: `${height}px` }} />
      )
  );
};

export default BarChart;

