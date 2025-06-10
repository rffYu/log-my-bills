import Taro from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { View, Text, Input  } from '@tarojs/components';
import { useDateRecordViewModel } from '@/viewmodels/dtRecVM';
import { useCategoryRecordViewModel } from '@/viewmodels/catRecVM';

// 类型定义
type BudgetItem = {
  amount: number;
};

 interface Props {
  currentMonth: string;
}

const MonthlyBudget: React.FC = ({ currentMonth }) => {
  const [budget, setBudget] = useState<BudgetItem>({ amount: 0 });
  const { getTotalByMonth } = useDateRecordViewModel();
  const { getTotalsGroupByCategory } = useCategoryRecordViewModel();
  const goToBudgetManagementPage = () => {
    Taro.navigateTo({ url: '/pages/budget/manage' });
  };

  // 加载本地存储中的预算
  useEffect(() => {
    // const storedBudget = Taro.getStorageSync('monthly-budget') || { amount: 1000 };
    const storedBudget = { amount: 3000 };
    setBudget(storedBudget);
  }, []);

  const spent = getTotalByMonth(currentMonth);
  const percent = Math.min(100, Math.round((spent / budget.amount) * 100));
  const totals = getTotalsGroupByCategory() ?? [];

  const systemInfo = Taro.getSystemInfoSync();
  const windowWidth = systemInfo.windowWidth;

  return (
    <View style={{ padding: '16px' }}>

      <View
        hoverStyle={{ backgroundColor: '#f5f5f5' }}
        onClick={ goToBudgetManagementPage }>
        <View style={{ marginTop: 12 }}>
          <Text>￥{spent} / ￥{budget.amount}（{percent}%）</Text>
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

