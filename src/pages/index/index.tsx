import { View, Text, Picker } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useSelector } from 'react-redux';
import './index.scss';
import './card.scss';

const Card = ({ title, extra, note, children }: Props) => {
  return (
    <View className="custom-card">
      <View className="card-header">
        <Text className="card-title">{title}</Text>
        {extra && <Text className="card-extra">{extra}</Text>}
      </View>
      <View className="card-content">{children}</View>
      {note && <Text className="card-note">{note}</Text>}
    </View>
  );
};

const Index = () => {
  const records = useSelector((state: RootState) => state.record);
  const currentMonth = new Date().toISOString().slice(0, 7);
  const allMonths = ['2025/04', '2025/03', '2025/02'];

  return (
      <View className="index-page">

      {/* Top summary block */}
      <View className="summary-box">
        <Text className="section-title">本月总支出</Text>
        <Text className="total-text">￥1234.56</Text>
        <Picker mode="selector" range={allMonths}>
          <Text className="month-text">当前月份：{currentMonth}</Text>
        </Picker>
      </View>

      {/* Category Pie Chart */}
      <View className="chart-box">
        <Text className="section-title">分类支出图</Text>
        <View className="dummy-chart">[ 饼图占位 ]</View>
      </View>

      {/* Recent Records */}
      <View className="records-box">
        <Text className="section-title">最近记录</Text>
        {[1, 2, 3].map(i => (
          <Card
            key={i}
            title={`记录 ${i}`}
            extra="￥88.88"
            note="2025-04-22"
          >
            分类：购物
          </Card>
        ))}
      </View>

      {/* Month Breakdown */}
      <View className="breakdown-box">
        <Text className="section-title">按日拆分</Text>
        {[1, 2, 3].map(day => (
          <View className="daily-summary" key={day}>
            <Text>4月{day}日</Text>
            <Text style={{ marginLeft: '12px' }}>￥{day * 100}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Index;

