import { useEffect, useRef } from 'react';
import Taro from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { useCategoryRecordViewModel } from '@/viewmodels/catRecVM';
import BarChart from '@/components/D3BarChart';
import PieChart from '@/components/D3PieChart';
import GlobalContainer from '@/components/GlobalContainer';
import './index.scss';

const CatBreakDown = ({ catId, idx }) => {
  const { getRecordsByCategory } = useCategoryRecordViewModel();

  const recs = getRecordsByCategory(catId);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        height: '220px'
      }} >
      {/* Pie Chart on the left */}
      <View className="h-[170px]">
        <PieChart
          data={recs.map(d => ({
            value: d.amount,
            label: d.title ?? d.date,
          }))}
          width={200}
          height={200}
          canvasId={`pie-canvas-${idx}`}
        />
      </View>

      {/* Text summary on the right */}
      <View style={{
          display: 'flex',
          flexDirection: 'column',
          size: 12
        }}>
        {recs.map((d, idx) => (
          <Text key={idx} >
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

  const goToCategoryManagementPage = () => {
    Taro.navigateTo({ url: '/pages/category/manage' });
  };

  return (
    <View className="category-page-container">
      <View className="header">
        <Text className="header-title">Category Overview</Text>
        <Button size="mini" onClick={ goToCategoryManagementPage }>管理分类</Button>
      </View>
      <BarChart data={totals.map(d => ({x: d.catName, y: d.total}))} width={windowWidth - 60} height={240} />

      <View className="category-list">
        {cats.map(([cat, id], index) => (
          <View className="category-item" key={index}>
            <Text className="category-name">{ cat }</Text>
            <Text className="category-total">Total: ￥{ (getTotalByCategory(id))?.total ?? 0 }</Text>
            <View className="category-chart">
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

