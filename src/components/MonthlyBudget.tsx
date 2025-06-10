import Taro from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { View, Text, Input  } from '@tarojs/components';
import { useDateRecordViewModel } from '@/viewmodels/dtRecVM';
import { useCategoryRecordViewModel } from '@/viewmodels/catRecVM';
import D3BudgetChart from '@/components/D3BudgetChart';

 interface Props {
  currentMonth: string;
}

const MonthlyBudget: React.FC = ({ currentMonth }) => {
  const [budget, setBudget] = useState<BudgetItem>(0);
  const { getTotalByMonth } = useDateRecordViewModel();
  const { getTotalsGroupByCategory } = useCategoryRecordViewModel();
  const goToBudgetManagementPage = () => {
    Taro.navigateTo({ url: '/pages/budget/manage' });
  };

  // 加载本地存储中的预算
  useEffect(() => {
    const storedBudget = Taro.getStorageSync('monthly-budget') || 1000;
    setBudget(storedBudget);
  }, []);

  const spent = getTotalByMonth(currentMonth);
  const percent = Math.min(100, Math.round((spent / budget) * 100));
  const totals = getTotalsGroupByCategory() ?? [];

  const systemInfo = Taro.getSystemInfoSync();
  const windowWidth = systemInfo.windowWidth;

  return (
    <View style={{ padding: '16px' }}>

      <View
        hoverStyle={{ backgroundColor: '#f5f5f5' }}
        onClick={ goToBudgetManagementPage }>
        <Text style={{ fontWeight: 'bold' }}>预算使用情况</Text>
        <View style={{ marginTop: 12 }}>
          <Text>￥{spent} / ￥{budget}（{percent}%）</Text>
          <D3BudgetChart
            data={totals.map(item => ({
              value: Math.abs(item.total),
              label: item.catName
            }))}
            budget={{ total: budget }}
            width={ windowWidth - 60 } />
          <View style={{ height: 10, background: '#eee', borderRadius: 4, overflow: 'hidden', marginTop: 4 }}>
            <View
              style={{
                width: `${percent}%`,
                height: '100%',
                background: percent >= 100 ? '#E64340' : percent >= 80 ? '#FFAA00' : '#00D09C'
              }}
            />
          </View>
          {percent >= 100 && <Text style={{ color: '#E64340' }}>已超出预算！</Text>}
          {percent >= 80 && percent < 100 && <Text style={{ color: '#FFAA00' }}>即将超出预算</Text>}
        </View>
      </View>
    </View>
  );
};

export default MonthlyBudget;

