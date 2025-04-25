import { View, Text, Picker } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';
import { useDateRecordViewModel } from '@/viewmodels/dtRecVM';
import { useRecordViewModel } from '@/viewmodels/recordVM';
import { useCategoryRecordViewModel } from '@/viewmodels/catRecVM';
import PieChart from '@/components/D3PieChart';
import GlobalContainer from '@/components/GlobalContainer';
//import './index.scss';
//import './card.scss';

const Card = ({ title, extra, note, children }: Props) => {
  return (
    <View className="custom-card bg-white p-4 mb-3 rounded-lg shadow-md">
      <View className="card-header flex justify-between mb-2">
        <Text className="card-title font-bold text-lg">{ title }</Text>
        { extra && <Text className="card-extra text-red-500 font-medium">{ extra }</Text> }
      </View>
        <View className="card-content text-gray-800 mb-2">{ children }</View>
        { note && <Text className="card-note text-sm text-gray-500">{ note }</Text> }
      </View>
  );
};

const CatSummary = () => {
  const { getTotalsGroupByCategory } = useCategoryRecordViewModel();
  const totals = getTotalsGroupByCategory() ?? [];

  const getColor = (index: number) =>
    d3.interpolateCool(index / totals.length); // same as chart
  return (
    <View className="cat-summary flex flex-row gap-4 items-start">
      <PieChart
      data={totals.map(item => ({
        value: item.total,
        label: item.catName
      }))}
      width={300}
      height={300}
    />

        <View className="flex flex-col flex-1">
          {totals.map((item, index) => (
            <View className="cat-item flex flex-row items-center mb-2" key={index}>
              <View
              className="color-dot w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: getColor(index) }} />
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
    <View className="index-page p-4 bg-[#fafafa] space-y-6">

      {/* Summary Block */}
        <View className="summary-box bg-white rounded-xl p-5 text-center mb-5">
          <Text className="section-title text-[18px] font-bold mb-2">本月总支出</Text>
          <Text className="total-text text-[24px] text-[#ff6700] my-2">{`￥${getTotalByMonth(currentMonth)}`}</Text>
          <Picker mode="selector" range={allMonths}>
            <Text className="month-text text-[16px] text-[#666666]">当前月份：{currentMonth}</Text>
          </Picker>
        </View>

        {/* Chart Block */}
        <View className="chart-box bg-white rounded-xl p-4 mb-5">
          <Text className="section-title text-[18px] font-bold mb-4">分类支出图</Text>
          <CatSummary />
          {/* Example fallback if empty */}
          {/* <View className="dummy-chart h-[200px] bg-[#f0f0f0] rounded-lg flex items-center justify-center text-[#999]">
      暂无数据
    </View> */}
        </View>

        {/* Records Block */}
        <View className="records-box mb-5">
          <Text className="section-title text-[18px] font-bold mb-4">最近记录</Text>
          {getRecentRecords(3).map(i => (
            <Card
              key={i.id}
              title={`记录 ${i.title}`}
              extra={`￥${i.amount}`}
              note={i.date}
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

