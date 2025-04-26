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
    <View
      className="flex flex-row items-start w-full p-2"
      style={{
        display: 'flex',
      }}
    >
        {/* Bar Chart on the left */}
        <View
        className="mr-2"
        style={{
          width: `${windowWidth * 0.6}px`, // 60%屏幕宽
        }}
      >
          <BarChart
          data={recs.map(d => ({ x: d.date, y: d.amount }))}
          width={windowWidth * 0.6}
          height={170}
          canvasId={`bar-canvas-${idx}`}
          color='#2b7fff'
        />
        </View>

        {/* Text summary on the right */}
        <View
        className="flex flex-col ml-2 overflow-y-auto"
        style={{
          display: 'flex',
          overflowY: 'auto',
          width: `${windowWidth * 0.35}px`, // 35%屏幕宽
          maxHeight: '170px',
          fontSize: '12px',
        }}
      >
          {recs.map((d, idx) => (
            <Text key={idx} className="text-xs mb-1 text-right text-gray-500">
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
    <View className="category-page-container p-4 space-y-6 bg-gray-50 min-h-screen">
      <View className="flex justify-center">
        <BarChart data={totals.map(d => ({x: d.catName, y: d.total}))} width={windowWidth - 60} height={240} />
      </View>

      <View className="category-list flex flex-col space-y-6">
        {cats.map(([cat, id], index) => (
          <View className="category-item rounded-xl p-4 shadow-sm bg-white" key={index}>
              <View className="flex flex-row py-4 justify-between items-center mb-4">
                <Text className="category-name text-lg font-semibold text-gray-700">{ cat }</Text>
                <Text className="category-total text-base text-green-600">Total: ￥{ (getTotalByCategory(id))?.total ?? 0 }</Text>
              </View>
            <View className="category-chart mt-4">
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

