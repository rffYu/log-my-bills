import Taro from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { View, Text, Input, Button } from '@tarojs/components';
import { useDateRecordViewModel } from '@/viewmodels/dtRecVM';
import { useCategoryRecordViewModel } from '@/viewmodels/catRecVM';
import D3BudgetChart from '@/components/D3BudgetChart';

 interface Props {
  categoryIdx: number;
}

const MonthlyBudget: React.FC = ({ categoryIdx }) => {
  const [budget, setBudget] = useState<BudgetItem>(0);
  const { categoryIdMap, getTotalByCategory } = useCategoryRecordViewModel();

  const goToBudgetManagementPage = () => {
    Taro.navigateTo({ url: '/pages/budget/manage' });
  };

  // 加载本地存储中的预算
  useEffect(() => {
    const storedBudget = Taro.getStorageSync('budgets') || [];
    const matchedBudget = storedBudget.find(b => b.categoryIdx === categoryIdx);
    const amount = matchedBudget?.amount || 0;
    setBudget(amount);
  }, []);

  const spent = getTotalByCategory(categoryIdx)?.total || 0;
  const percent = Math.min(100, Math.round((spent / budget) * 100));

  const systemInfo = Taro.getSystemInfoSync();
  const windowWidth = systemInfo.windowWidth;

  if (!budget) return <Button size="mini" onClick={ goToBudgetManagementPage }>设置预算</Button>;  // budget not setted show nothing.

  return (
    <View style={{ padding: '16px' }}>

      <View
        hoverStyle={{ backgroundColor: '#f5f5f5' }}
        onClick={ goToBudgetManagementPage }>
        <Text className="text-sm text-gray-500 font-semibold">预算使用情况</Text>
        <View style={{ marginTop: 12 }}>
          <Text>￥{spent} / ￥{budget}（{percent}%）</Text>
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

