import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import { Canvas } from '@tarojs/components';

export default function ChartView() {
  const canvasRef = useRef();

  useEffect(() => {
    const chart = echarts.init(canvasRef.current as any);
    chart.setOption({
      xAxis: {
        type: 'category',
        data: ['Food', 'Shopping', 'Transport']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 200, 150],
        type: 'bar'
      }]
    });
  }, []);

  return (
    <Canvas
      canvasId="chartCanvas"
      style={{ width: '100%', height: '300px' }}
      ref={canvasRef}
    />
  );
}

