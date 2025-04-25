import { View, Text, Picker } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';
import { useDateRecordViewModel } from '@/viewmodels/dtRecVM';
import { useRecordViewModel } from '@/viewmodels/recordVM';
import { useCategoryRecordViewModel } from '@/viewmodels/catRecVM';
import PieChart from '@/components/D3PieChart';
import GlobalContainer from '@/components/GlobalContainer';
import './index.scss';
import './card.scss';

const Card = ({ title, extra, note, children }: Props) => {
  return (
    <View className="custom-card">
      <View className="card-header">
        <Text className="card-title">{ title }</Text>
        { extra && <Text className="card-extra">{ extra }</Text> }
      </View>
      <View className="card-content">{ children }</View>
      { note && <Text className="card-note">{ note }</Text> }
    </View>
  );
};

const CatSummary = () => {
  const { getTotalsGroupByCategory } = useCategoryRecordViewModel();
  const totals = getTotalsGroupByCategory() ?? [];

  const getColor = (index: number) =>
    d3.interpolateCool(index / totals.length); // same as chart
  return (
    <View className="cat-summary flex-row gap-4 items-start" style={{
      display: 'flex',
      flexDirection: 'row',
      gap: 16,
      alignItems: 'flex-start'
    }}>
      <View className="cat-chart">
        <PieChart
        data={totals.map(item => ({
          value: item.total,
          label: item.catName
        }))}
        width={300}
        height={300}
      />
      </View>

        <View className="flex-1" style={{ display: 'flex', flexDirection: 'column' }}>
         {totals.map((item, index) => (
          <View className="cat-item" key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <View
              className="color-dot"
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: getColor(index),
                marginRight: 8
              }} />
            <Text>{item.catName}: ¥{item.total}</Text>
          </View>
        ))}
        </View>
      </View>
  );
};

const IndexPage = () => {
  const records = useSelector((state: RootState) => state.record);
  const currentMonth = new Date().toISOString().slice(0, 7);
  const allMonths = ['2025/04', '2025/03', '2025/02'];

  const { getTotalByMonth, getTotalsGroupByDay } = useDateRecordViewModel();
  const { getRecentRecords } = useRecordViewModel();

  return (
      <View className="index-page">

      {/* Top summary block */}
      <View className="summary-box">
        <Text className="section-title">本月总支出</Text>
        <Text className="total-text">{ `￥${getTotalByMonth(currentMonth)}` }</Text>
        <Picker mode="selector" range={ allMonths }>
          <Text className="month-text">当前月份：{ currentMonth }</Text>
        </Picker>
      </View>

      {/* Category Pie Chart */}
      <View className="chart-box">
        <Text className="section-title">分类支出图</Text>
        <CatSummary/>
      </View>

      {/* Recent Records */}
      <View className="records-box">
        <Text className="section-title">最近记录</Text>
        { getRecentRecords(3).map(i => (
          <Card
            key={i.id}
            title={ `记录 ${i.title}` }
            extra={ `￥${i.amount}` }
            note={ i.date }
          >
            分类：购物
          </Card>
        ))}
      </View>

      {/* Month Breakdown */}
        <View className="breakdown-box">
          <Text className="section-title">按日拆分</Text>
          { getTotalsGroupByDay()?.map(({ date, value }, idx, arr) => (
            <View
              key={date}
              className={`daily-summary flex justify-between py-2 border-b ${
idx === arr.length - 1 ? 'border-b-0' : 'border-[#eee]'
}`}
            >
                <Text>{date}</Text>
                <Text>￥{value}</Text>
              </View>
          ))}
      </View>

      <GlobalContainer />
    </View>
  );
};

export default IndexPage;

