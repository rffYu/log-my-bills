import Taro from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { View, Text, Input, Picker } from '@tarojs/components';
import { useDateRecordViewModel } from '@/viewmodels/dtRecVM';
import { useCategoryRecordViewModel } from '@/viewmodels/catRecVM';

type BudgetItem = {
  categoryIdx: number;
  amount: number;
};

const currentMonth = "2025-04";

const BudgetManagerCategory: React.FC = () => {
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);
  const [inputAmount, setInputAmount] = useState<string>('');

  const { getTotalByCategory } = useCategoryRecordViewModel();
  const { categoryIdMap } = useCategoryRecordViewModel();

  const categoryList = Object.values(categoryIdMap);

  useEffect(() => {
    const storedBudgets = Taro.getStorageSync('budgets') || [];
    setBudgets(storedBudgets);
  }, []);

  const saveBudget = () => {
    const amount = parseFloat(inputAmount);
    if (isNaN(amount) || amount <= 0) {
      Taro.showToast({ title: '请输入有效金额', icon: 'none' });
      return;
    }

    //const selectedCategoryId = categoryList[selectedCategoryIndex]?.id;
    if (!selectedCategoryIndex) return;

    const newBudgets = [...budgets.filter(b => b.categoryIdx !== selectedCategoryIndex), { categoryIdx: selectedCategoryIndex, amount }];
    setBudgets(newBudgets);
    Taro.setStorageSync('budgets', newBudgets);
    Taro.showToast({ title: '预算已保存', icon: 'success' });
  };

  return (
    <View style={{ padding: '16px' }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>分类预算设置</Text>

      <Picker
        mode="selector"
        range={ categoryList }
        onChange={(e) => setSelectedCategoryIndex(1 + parseInt(e.detail.value))}
      >
        <View style={{ padding: '8px 0' }}>
          { selectedCategoryIndex == 0 ? "选择分类" : `当前选择分类：${categoryIdMap[selectedCategoryIndex] || "Unknown"}` }
        </View>
      </Picker>

      <Input
        type="number"
        placeholder="请输入预算金额"
        value={inputAmount}
        onInput={(e) => setInputAmount(e.detail.value)}
      />

      <View onClick={saveBudget} style={{ marginTop: 12, background: '#6190E8', padding: '6px 12px', color: 'white', borderRadius: 4 }}>
        保存预算
      </View>

      <View style={{ marginTop: 24 }}>
        <Text style={{ fontWeight: 'bold' }}>预算使用情况</Text>
        {budgets.map((b) => {
          const spent = getTotalByCategory(b.categoryIdx)?.total || 0;
          const percent = Math.min(100, Math.round((spent / b.amount) * 100));
          const categoryName = categoryIdMap[b.categoryIdx] || '未命名';

          return (
            <View key={b.categoryIdx} style={{ marginTop: 12 }}>
              <Text>{categoryName}：￥{spent} / ￥{b.amount}（{percent}%）</Text>
              <View style={{ height: 10, background: '#eee', borderRadius: 4, overflow: 'hidden' }}>
                <View style={{
                  width: `${percent}%`,
                  height: '100%',
                  background: percent >= 100 ? '#E64340' : percent >= 80 ? '#FFAA00' : '#00D09C'
                }} />
              </View>
              {percent >= 100 && <Text style={{ color: '#E64340' }}>已超出预算！</Text>}
              {percent >= 80 && percent < 100 && <Text style={{ color: '#FFAA00' }}>即将超出预算</Text>}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const BudgetManagerMonthly: React.FC = () => {
  const [budget, setBudget] = useState<number>(0);
  const [inputAmount, setInputAmount] = useState<string>('');
  const { getTotalByMonth } = useDateRecordViewModel();

  useEffect(() => {
    const storedBudget = Taro.getStorageSync('monthly-budget');
    if (storedBudget && typeof storedBudget === 'number') {
      setBudget(storedBudget);
    }
  }, []);

  const saveBudget = () => {
    const amount = parseFloat(inputAmount);
    if (isNaN(amount) || amount <= 0) {
      Taro.showToast({ title: '请输入有效金额', icon: 'none' });
      return;
    }

    setBudget(amount);
    Taro.setStorageSync('monthly-budget', amount);
    Taro.showToast({ title: '预算已保存', icon: 'success' });
  };

  const spent = getTotalByMonth(currentMonth);
  const percent = budget > 0 ? Math.min(100, Math.round((spent / budget) * 100)) : 0;

  return (
    <View style={{ padding: '16px' }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>月度预算设置</Text>

      <Input
        type="number"
        placeholder="请输入预算金额"
        value={inputAmount}
        onInput={(e) => setInputAmount(e.detail.value)}
      />
      <View
        onClick={saveBudget}
        style={{ marginTop: 12, background: '#6190E8', padding: '6px 12px', color: 'white', borderRadius: 4 }}
      >
        保存预算
      </View>

      <View style={{ marginTop: 24 }}>
        <Text style={{ fontWeight: 'bold' }}>预算使用情况</Text>
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
  );
};

const BudgetManagerPage: React.FC = () => {
  return (
    <View className="budget-manager-page">
      <BudgetManagerMonthly />
      <BudgetManagerCategory />
    </View>
  );
};

export default BudgetManagerPage;
