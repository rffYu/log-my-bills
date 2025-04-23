import { View, Text, ScrollView } from '@tarojs/components';
import './index.scss';

const dummyHeatmap = [
  // Rows: Weeks, Cells: Dates with fake intensity
  [{ day: 30, level: 1 }, { day: 1, level: 3 }, { day: 2, level: 0 }, { day: 3, level: 2 }, { day: 4, level: 1 }, { day: 5, level: 4 }, { day: 6, level: 1 }],
  [{ day: 7, level: 1 }, { day: 8, level: 2 }, { day: 9, level: 0 }, { day: 10, level: 2 }, { day: 11, level: 3 }, { day: 12, level: 1 }, { day: 13, level: 0 }],
  [{ day: 14, level: 1 }, { day: 15, level: 4 }, { day: 16, level: 3 }, { day: 17, level: 0 }, { day: 18, level: 1 }, { day: 19, level: 2 }, { day: 20, level: 2 }],
  [{ day: 21, level: 3 }, { day: 22, level: 1 }, { day: 23, level: 2 }, { day: 24, level: 1 }, { day: 25, level: 0 }, { day: 26, level: 1 }, { day: 27, level: 3 }],
  [{ day: 28, level: 2 }, { day: 29, level: 4 }, { day: 30, level: 1 }]
];

const dummyDailyRecords = [
  { date: '4月1日 (周二)', amount: '￥168.00', count: 3 },
  { date: '4月2日 (周三)', amount: '￥92.50', count: 1 },
  { date: '4月3日 (周四)', amount: '￥300.00', count: 5 }
];

const MonthlySummaryPage = () => {
  return (
    <ScrollView scrollY className="page-container">
      <View className="header">
        <Text className="month-nav">{'<  2025年4月  >'}</Text>
        <Text className="monthly-total">￥3,456.78</Text>
      </View>

      <View className="section">
        <Text className="section-title">月度支出热力图</Text>
        <View className="calendar-heatmap">
          <View className="calendar-row">
            {['日', '一', '二', '三', '四', '五', '六'].map((d) => (
              <Text className="calendar-cell header" key={d}>{d}</Text>
            ))}
          </View>
          {dummyHeatmap.map((week, wi) => (
            <View className="calendar-row" key={wi}>
              {week.map(({ day, level }, di) => (
                <Text className={`calendar-cell level-${level}`} key={di}>{day}</Text>
              ))}
            </View>
          ))}
        </View>
      </View>

      <View className="section">
        <Text className="section-title">每日支出汇总</Text>
        {dummyDailyRecords.map((rec, idx) => (
          <View className="daily-record" key={idx}>
            <View className="top">
              <Text>{rec.date}</Text>
              <Text className="amount">{rec.amount}</Text>
              <Text className="note">📝 {rec.count} 条记录</Text>
            </View>
            <View className="category-chart">
              [Pie Chart for {rec.date}]
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default MonthlySummaryPage;
