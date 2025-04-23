import { View } from '@tarojs/components';
import PieChart from '@/components/D3PieChart'

const PiePage = () => {

  return (
    <View>
      <PieChart
      data={[
        { value: 30, label: 'Food' },
        { value: 20, label: 'Transport' },
        { value: 50, label: 'Entertainment' }
      ]}
    />
    </View>
  );
};

export default PiePage;

