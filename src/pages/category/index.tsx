import { useEffect, useRef } from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { useCategoryRecordViewModel } from '@/viewmodels/catRecVM';
import BarChart from '@/components/D3BarChart';
import './index.scss';

const categories = [
  { name: 'Food', total: 1200 },
  { name: 'Transport', total: 800 },
  { name: 'Entertainment', total: 600 },
  { name: 'Shopping', total: 400 },
  { name: 'Healthcare', total: 300 }
];

const CategoryPage = () => {
  const systemInfo = Taro.getSystemInfoSync();
  const windowWidth = systemInfo.windowWidth;

  return (
    <View className="category-page-container">
      <View className="header">
        <Text className="header-title">Category Overview</Text>
      </View>
      <BarChart data={categories.map(d => ({x: d.name, y: d.total}))} width={windowWidth - 60} height={240} />

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

