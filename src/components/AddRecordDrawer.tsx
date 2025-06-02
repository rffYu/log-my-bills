import { View, Text, Input, Button, Picker } from '@tarojs/components';
import { useState } from 'react';
import RecordItem from '@/models/recordModel';

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

const startDate = new Date('2025-05-01');
const endDate = new Date('2025-06-01');

const dummyDateRange = [];
for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
  dummyDateRange.push(d.toISOString().slice(0, 10));
}

const AddRecordDrawer = ({ visible, onClose, onSubmit }: Props) => {
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [type, setType] = useState(null);
  const [categoryId, setCategoryId] = useState(1); // example default

  if (!visible) return null;

  return (
    <View className="add-record-drawer">
      <View className="drawer-content">
        <Text>添加记录</Text>
        <Input value={title} onInput={e => setTitle(e.detail.value)} placeholder="标题" />
        <Input type="number" value={amount} onInput={e => setAmount(e.detail.value)} placeholder="金额" />
        <View className="date-pricker">
          <Picker mode="selector" range={ dummyDateRange } onChange={e => {
            const selected = dummyDateRange[Number(e.detail.value)];
            setDate(selected);
          }}>
            <Text>选择日期：{ date }</Text>
          </Picker>
        </View>

        <View className="type-picker">
          <Picker
            mode="selector"
            range={ typeOptions }
            onChange={e => {
              const selected = typeOptions[Number(e.detail.value)];
              setType(typeValueMap[selected]);
          }}>
            <View>{ type == null ? '选择类型' : typeReverseMap[type] }</View>
          </Picker>
        </View>

        <Picker mode="selector" range={['吃饭', '交通']} onChange={e => setCategoryId(Number(e.detail.value))}>
          <Text>选择分类</Text>
        </Picker>
        <Button onClick={() => {
          onSubmit({ title, amount: Number(amount), categoryId });
          onClose();
        }}>保存</Button>
        <Button onClick={onClose}>取消</Button>
      </View>
    </View>
  );
};

export default AddRecordDrawer;

