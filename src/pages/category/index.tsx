import { useEffect, useRef } from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { useCategoryRecordViewModel } from '@/viewmodels/catRecVM';
import BarChart from '@/components/D3BarChart';
import PieChart from '@/components/D3PieChart';
import GlobalContainer from '@/components/GlobalContainer';
import './index.scss';

const CatBreakDown = ({ catId, idx }) => {
  const { getRecordsByCategory } = useCategoryRecordViewModel();

  const windowWidth = Taro.getSystemInfoSync().windowWidth;
  const recs = getRecordsByCategory(catId);

  return (
    <View className="flex flex-row items-start justify-between w-full p-2"
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        height: '220px'
      }} >

      {/* Bar Chart on the left */}
      <View className="h-[170px] flex-1 mr-4">
        <BarChart data={recs.map(d => ({x: d.date, y: d.amount}))} width={windowWidth * 0.67 } height={170} canvasId={`bar-canvas-${idx}`}/>
      </View>

      {/* Text summary on the right */}
        <View className="flex flex-col flex-shrink-0 w-1/3"
        style={{
          display: 'flex',
          flexDirection: 'column',
          size: 12
        }}>
        {recs.map((d, idx) => (
          <Text key={idx} className="text-xs">
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
      <View className="flex justify-center">
        <BarChart data={totals.map(d => ({x: d.catName, y: d.total}))} width={windowWidth - 60} height={240} />
      </View>

      <View className="category-list flex flex-col space-y-6">
        {cats.map(([cat, id], index) => (
          <View className="category-item rounded-xl p-4 shadow-sm bg-white" key={index}>
              <View className="flex flex-row justify-between items-center mb-4">
            <Text className="category-name text-lg font-semibold text-gray-700">{ cat }</Text>
            <Text className="category-total text-base text-green-600">Total: ￥{ (getTotalByCategory(id))?.total ?? 0 }</Text>
                </View>
            <View className="category-chart mt-2">
              <CatBreakDown catId={ id } idx={ index }/>
            </View>
          </View>
        ))}
      </View>

      <GlobalContainer />
    </View>
  );
};

export default CategoryPage;

