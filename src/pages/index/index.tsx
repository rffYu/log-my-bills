import { View, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useSelector } from 'react-redux';

const Index = () => {
  const records = useSelector((state: RootState) => state.record);

  return (
    <View className="index">
      <Button onClick={() => Taro.navigateTo({ url: '/pages/add/index' })}>
        添加账单
      </Button>
      <View>
        {records.map((item) => (
          <View key={item.id}>
            <Text>{item.date} - {item.title} - ¥{item.amount}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Index;

