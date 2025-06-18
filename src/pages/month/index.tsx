import { View, Text, Picker } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useDateRecordViewModel } from '@/viewmodels/dtRecVM';
import CalendarHeatMap from '@/components/D3CalendarHeatMap';
import GlobalContainer from '@/components/GlobalContainer';
import './index.scss';

const dummyHeatmapData = [
  { date: "2025-04-01", value: 120 },
  { date: "2025-04-02", value: 80 },
  { date: "2025-04-03", value: 240 },
  { date: "2025-04-04", value: 60 },
  { date: "2025-04-05", value: 180 },
  { date: "2025-04-06", value: 0 },
  { date: "2025-04-07", value: 90 },
];

const allMonths = ['2025/04', '2025/03', '2025/02'];

const MonthlySummaryPage = () => {
  const currentMonth = '2025-04';
  const { getTotalsGroupByDayForMonth, getStatsPerDayForMonth, getTotalByMonth } = useDateRecordViewModel();
  const windowWidth = Taro.getSystemInfoSync().windowWidth ;

  return (
    <View className="page-container">
      <View className="header flex flex-col m-4 p-4 rounded-xl bg-white shadow">
        <View>
          <Text className="section-title text-xl font-semibold mb-2 text-gray-800">本月总支出</Text>
          <Text className="total-text text-xl font-bold text-rose-500">{ `￥${getTotalByMonth(currentMonth)}` }</Text>
        </View>
        <Picker mode="selector" range={ allMonths }>
          <Text className="month-text text-sm text-gray-500 mt-2">当前月份：{ currentMonth }</Text>
        </Picker>
      </View>

      <View className="section flex flex-col m-4 p-4 rounded-xl bg-white shadow">
        <Text className="section-title mb-2 text-xl font-semibold text-gray-800">月度支出热力图</Text>
        <View className="p4 flex justify-center item-center" style={{display: "flex"}}>
          <CalendarHeatMap
            month={currentMonth} data={getTotalsGroupByDayForMonth(currentMonth)} width={ windowWidth - 60 }/>
        {/* <CalendarHeatMap month={"2025-04"} data={dummyHeatmapData} /> */}
        </View>
      </View>

      <View className="section flex flex-col">
        <Text className="section-title ml-6 m-2 text-xl font-semibold text-gray-800">每日支出汇总</Text>
        {getStatsPerDayForMonth(currentMonth)?.map(({date, count, total}, idx) => (
            <View
              className="daily-record flex flex-col rounded-xl bg-white p-4 mx-4 mb-2 shadow"
              key={idx}
            >
                <View className="top flex items-center justify-between">
                  <Text className="text-gray-600 text-sm">{date}</Text>
                  <Text className="amount text-lg font-semibold text-blue-600">￥{total}</Text>
                </View>
                <Text className="note text-xs text-gray-400">📝 {count} 条记录</Text>
              </View>
        ))}
      </View>

      <GlobalContainer/>
    </View>
  );
}

export default MonthlySummaryPage;
