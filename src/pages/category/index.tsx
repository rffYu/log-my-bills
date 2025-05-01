import { useEffect, useRef } from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { useCategoryRecordViewModel } from '@/viewmodels/catRecVM';
import BarChart from '@/components/D3BarChart';
import PieChart from '@/components/D3PieChart';
import GlobalContainer from '@/components/GlobalContainer';

const CatBreakDown = ({ catId }) => {
  const { getRecordsByCategory } = useCategoryRecordViewModel();

  const recs = getRecordsByCategory(catId);

  return (
    <View className="flex flex-row gap-4 items-start">
      {/* Pie Chart on the left */}
      <View className="w-[300px]">
        <PieChart
          data={recs.map(d => ({
            value: d.amount,
            label: d.title ?? d.date,
          }))}
          width={300}
          height={300}
        />
      </View>

      {/* Text summary on the right */}
      <View className="flex flex-col gap-2">
        {recs.map((d, idx) => (
          <Text key={idx} className="text-sm text-gray-700">
            {d.title ?? d.date}: ￥{d.amount}
          </Text>
        ))}
      </View>
    </View>
  );
};

const CategoryPage = () => {
  const systemInfo = Taro.getSystemInfoSync();
  const windowWidth = systemInfo.windowWidth;

  const { getTotalsGroupByCategory, getExistingCategories, getTotalByCategory } = useCategoryRecordViewModel();
  const totals = getTotalsGroupByCategory() ?? [];

  const cats = getExistingCategories();

  return (
    <View className="category-page-container">
      <View className="header">
        <Text className="header-title">Category Overview</Text>
      </View>
      <BarChart data={totals.map(d => ({x: d.catName, y: d.total}))} width={windowWidth - 60} height={240} />

      <View className="category-list">
        {cats.map(([cat, id], index) => (
          <View className="category-item" key={index}>
            <Text className="category-name">{ cat }</Text>
            <Text className="category-total">Total: ￥{ (getTotalByCategory(id))?.total ?? 0 }</Text>
            <View className="category-chart">
              <CatBreakDown catId={ id } />
            </View>
          </View>
        ))}
      </View>

      <GlobalContainer />
    </View>
  );
};

export default CategoryPage;

