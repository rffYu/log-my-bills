import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import { Canvas } from '@tarojs/components';
import React from 'react';
import { View, Text } from '@tarojs/components';
import './index.scss';

const categories = [
  { name: 'Food', total: 1200 },
  { name: 'Transport', total: 800 },
  { name: 'Entertainment', total: 600 },
  { name: 'Shopping', total: 400 },
  { name: 'Healthcare', total: 300 }
];

const CategoryPage = () => {
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
    <View className="category-page-container">
      <View className="header">
        <Text className="header-title">Category Overview</Text>
      </View>

      <Canvas
          canvasId="chartCanvas"
          style={{ width: '100%', height: '300px' }}
          ref={canvasRef}
        />

      <View className="category-list">
        {categories.map((category, index) => (
          <View className="category-item" key={index}>
            <Text className="category-name">{category.name}</Text>
            <Text className="category-total">Total: ￥{category.total}</Text>
            {/* Placeholder for Pie Chart */}
            <View className="category-chart">
              [Pie Chart for {category.name}]
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CategoryPage;

