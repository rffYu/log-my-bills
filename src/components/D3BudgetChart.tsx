import React, { useEffect, useRef } from 'react';
import Taro from '@tarojs/taro';
import { Canvas, View } from '@tarojs/components';
import * as d3 from 'd3';

interface DataItem {
  label: string; // category name
  value: number; // amount spent
}

interface Budget {
  total: number; // total budget for the month
}

interface Props {
  data: DataItem[];
  budget: Budget;
  width?: number;
  height?: number;
  canvasId?: string;
}

const D3BudgetBarChart: React.FC<Props> = ({ data, budget, width = 300, height = 100, canvasId = 'budget-bar' }) => {
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
          drawChart(ctx, res[0].width, res[0].height);
        });
    } else {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        drawChart(ctx, width, height);
      }
    }
  }, [data, budget]);

  const drawChart = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const innerWidth = w - margin.left - margin.right;
    const innerHeight = h - margin.top - margin.bottom;

    const totalSpent = d3.sum(data, (d) => d.value);
    const segments = [...data];

    // Add remaining budget as "Unused" if any
    if (budget.total > totalSpent) {
      segments.push({ label: 'Unused', value: budget.total - totalSpent });
    }

    let xPos = 0;
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(margin.left, margin.top);

    segments.forEach((d, i) => {
      const barWidth = (d.value / budget.total) * innerWidth;
      ctx.fillStyle = d.label === 'Unused' ? '#ddd' : d3.interpolateViridis(i / segments.length);
      ctx.fillRect(xPos, 0, barWidth, innerHeight);

      // Label inside bar
      if (barWidth > 30) {
        ctx.fillStyle = '#fff';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${d.label}: ${d.value}`, xPos + barWidth / 2, innerHeight / 2);
      }

      xPos += barWidth;
    });

    ctx.restore();
  };

  return (
    <View>
      {Taro.getEnv() === Taro.ENV_TYPE.WEAPP ? (
        <Canvas
          type="2d"
          id={canvasId}
          canvasId={canvasId}
          style={{ width: `${width}px`, height: `${height}px` }}
        />
      ) : (
        <canvas
          ref={canvasRef}
          id={canvasId}
          style={{ width: `${width}px`, height: `${height}px` }}
        />
      )}
    </View>
  );
};

export default D3BudgetBarChart;
