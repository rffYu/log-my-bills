import { View, Text, ScrollView, Picker } from '@tarojs/components';
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

  return (
    <ScrollView scrollY className="page-container">
      <View className="header">
        <Picker mode="selector" range={ allMonths }>
          <Text className="month-text">当前月份：{ currentMonth }</Text>
        </Picker>
        <Text className="monthly-total">￥{ getTotalByMonth(currentMonth) }</Text>
      </View>

      <View className="section">
        <Text className="section-title">月度支出热力图</Text>
        <CalendarHeatMap month={currentMonth} data={getTotalsGroupByDayForMonth(currentMonth)} />
        {/* <CalendarHeatMap month={"2025-04"} data={dummyHeatmapData} /> */}
      </View>

      <View className="section">
        <Text className="section-title">每日支出汇总</Text>
        {getStatsPerDayForMonth(currentMonth)?.map(({date, count, total}, idx) => (
          <View className="daily-record" key={idx}>
            <View className="top">
              <Text>{ date }</Text>
              <Text className="amount">{ total }</Text>
              <Text className="note">📝 { count } 条记录</Text>
            </View>
          </View>
        ))}
      </View>

      <GlobalContainer/>
    </ScrollView>
  );
}

export default MonthlySummaryPage;
