import { ScrollView, View, Text, Input, Button, Picker } from '@tarojs/components';
import { useState } from 'react';
import RecordItem from '@/models/recordModel';
import './AddRecordDrawer.scss';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<RecordItem>) => void;
}

const typeOptions = ['支出', '收入'];
const typeValueMap = {
  '支出': -1,
  '收入': 1,
};
const typeReverseMap = {
  '-1': '支出',
  '1': '收入',
};

const AddRecordDrawer = ({ visible, onClose, onSubmit }: Props) => {
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState(null);
  const [categoryId, setCategoryId] = useState(1); // example default

  if (!visible) return null;

  return (
    <View className="add-record-drawer fixed bottom-0 left-0 w-full bg-white p-4 rounded-t-2xl shadow-xl z-[999]">
      <View className="drawer-content flex flex-col gap-4">
        <Text className="text-lg font-bold">添加记录</Text>
        <Input value={title} onInput={e => setTitle(e.detail.value)} placeholder="标题" className="border border-gray-300 p-2 rounded" />
        <Input type="number" value={amount} onInput={e => setAmount(e.detail.value)} placeholder="金额" className="border border-gray-300 p-2 rounded" />

        <Picker
          mode="selector"
          range={ typeOptions }
          onChange={e => {
            const selected = typeOptions[Number(e.detail.value)];
            setType(typeValueMap[selected]);
        }}>
          <View className="border border-gray-300 p-2 rounded text-gray-600">
            { type == null ? '选择类型' : typeReverseMap[type] }
          </View>
        </Picker>

        <Picker
        mode="selector"
        range={['吃饭', '交通']}
        onChange={e => setCategoryId(Number(e.detail.value))}
      >
          <View className="border border-gray-300 p-2 rounded text-gray-600">选择分类</View>
        </Picker>

        <Button className="bg-blue-500 text-white rounded" onClick={() => {
          onSubmit({ title, amount: Number(amount), categoryId });
          onClose();
        }}>保存</Button>

        <Button className="bg-gray-300 text-black rounded" onClick={onClose}>取消</Button>
      </View>
      </View>
  );
};

export default AddRecordDrawer;

