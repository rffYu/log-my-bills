import { View, Text, Picker } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useSelector } from 'react-redux';
import { useDateRecordViewModel } from '@/viewmodels/dtRecVM';
import { useRecordViewModel } from '@/viewmodels/recordVM';
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

const Index = () => {
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
        <View className="dummy-chart">[ 饼图占位 ]</View>
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
          { Object.entries(getTotalsGroupByDay()).map(([day, total]) => (
            <View className="daily-summary" key={ day }>
              <Text>{ day }</Text>
                <Text style={ { marginLeft: '12px' } }>￥{ total }</Text>
              </View>
          ))}
      </View>
    </View>
  );
};

export default Index;

