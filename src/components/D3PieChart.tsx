import { useEffect, useRef } from 'react';
import Taro, { useReady, useDidShow } from '@tarojs/taro';
import { View, Canvas } from '@tarojs/components';
import * as d3 from 'd3';

interface DataItem {
  value: number;
  label: string;
}

interface PieChartProps {
  data: DataItem[];
  width?: number;
  height?: number;
  outerRadius?: number;
  innerRadius?: number;
  canvasId?: string;
}

const PieChart: React.FC<Props> = ({
  data,
  width = 300,
  height = 300,
  outerRadius = 100,
  innerRadius = 0,
  canvasId = 'pieCanvas'
}: PieChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawChart = (ctx: CanvasRenderingContext2D, width: number, height: number, dpr: number) => {
    const arcs = d3.pie<DataItem>()
    .value((d) => d.value)
    .padAngle(0.01)(data);

    const arcGen = d3.arc<d3.PieArcDatum<DataItem>>()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

    ctx.save();
    ctx.clearRect(0, 0, width, height);
    ctx.translate(width / 2, height / 2);

    arcs.forEach((arc, i) => {
      const path = arcGen(arc);

      if (!path) return;

      ctx.beginPath();

      // Move to starting point
      const startAngle = arc.startAngle;
      const endAngle = arc.endAngle;

      // Draw outer arc
      ctx.moveTo(
        Math.cos(startAngle) * outerRadius,
        Math.sin(startAngle) * outerRadius
      );
      ctx.arc(0, 0, outerRadius, startAngle, endAngle);

      // Draw inner arc (if donut)
      if (innerRadius > 0) {
        ctx.lineTo(
          Math.cos(endAngle) * innerRadius,
          Math.sin(endAngle) * innerRadius
        );
        ctx.arc(0, 0, innerRadius, endAngle, startAngle, true);
      } else {
        ctx.lineTo(0, 0);
      }

      ctx.closePath();

      ctx.fillStyle = d3.interpolatePlasma(i / data.length);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.stroke();

      // Draw label
      const angle = (arc.startAngle + arc.endAngle) / 2;
      const labelRadius = (innerRadius + outerRadius) / 2;
      const x = Math.cos(angle) * labelRadius;
      const y = Math.sin(angle) * labelRadius;

      ctx.fillStyle = '#fff';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(arc.data.label, x, y);
    });

    ctx.restore();
  };

  useDidShow(() => {
    const env = Taro.getEnv();
    if (env === Taro.ENV_TYPE.WEAPP) {
      // Weixin Mini Program
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
          drawChart(ctx, res[0].width, res[0].height, dpr);
        });
    } else {
      // H5
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d')!;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        drawChart(ctx, width, height, dpr);
      }
    }
  });

  return (
    <View className="flex justify-center items-center">
      {Taro.getEnv() === Taro.ENV_TYPE.WEAPP ? (
        <Canvas
          type='2d'
          id={canvasId}
          canvasId={canvasId}
          style={{ width: `${width}px`, height: `${height}px` }}
          width={ width }
          height={ height }
        />
      ) : (
        <canvas
          ref={canvasRef}
          id={canvasId}
          style={{ width: `${width}px`, height: `${height}px` }}
          width={ width }
          height={ height }
        />
      )}
    </View>
  );
};

export default PieChart;

