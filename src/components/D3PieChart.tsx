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
    const arcs = d3.pie<DataItem>().value((d) => d.value).padAngle(0.01)(data);
    const arcGen = d3.arc<d3.PieArcDatum<DataItem>>()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    ctx.save();
    ctx.clearRect(0, 0, width, height);
    ctx.translate(width / 2, height / 2);

    arcs.forEach((arc, i) => {
      const path = arcGen(arc);
      const p = new Path2D(path!);
      ctx.fillStyle = d3.interpolateCool(i / data.length);
      ctx.fill(p);
      ctx.strokeStyle = '#fff';
      ctx.stroke(p);

      const [x, y] = arcGen.centroid(arc);
      ctx.fillStyle = '#fff';
      ctx.font = '10px sans-serif';
      ctx.fillText(arc.data.label, x * 1.3, y * 1.3);
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
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        drawChart(ctx, width, height, dpr);
      }
    }
  });

  return (
    <View>
      {Taro.getEnv() === Taro.ENV_TYPE.WEAPP ? (
        <Canvas
          type='2d'
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

export default PieChart;

