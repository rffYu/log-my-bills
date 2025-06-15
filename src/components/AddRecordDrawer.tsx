import { ScrollView, View, Text, Input, Button, Picker } from '@tarojs/components';
import { useState } from 'react';
import { useCategoryRecordViewModel } from '@/viewmodels/catRecVM';
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
  const [categoryId, setCategoryId] = useState(null);

  const { getExistingCategories, categoryIdMap } = useCategoryRecordViewModel();
  const catIdMap = categoryIdMap ?? {};

  const catOptions = (getExistingCategories() ?? []).map(item => item[0]);

  if (!visible) return null;

  return (
    <View className="add-record-drawer fixed bottom-0 left-0 w-full bg-white p-4 rounded-t-2xl shadow-xl z-[999]">
      <View className="drawer-content flex flex-col gap-4">
        <Text className="text-lg font-bold">添加记录</Text>
        <Input value={title} onInput={e => setTitle(e.detail.value)} placeholder="标题" className="border border-gray-300 p-2 rounded" />
        <Input type="number" value={amount} onInput={e => setAmount(e.detail.value)} placeholder="金额" className="border border-gray-300 p-2 rounded" />

        <View className="border border-gray-300 p-2 rounded text-gray-600">
          <Picker mode="selector"
            range={ dummyDateRange }
            onChange={e => {
              const selected = dummyDateRange[Number(e.detail.value)];
              setDate(selected); }}>
            <Text>选择日期：{ date }</Text>
          </Picker>
        </View>

        <View className="border border-gray-300 p-2 rounded text-gray-600">
          <Picker
          mode="selector"
          range={ typeOptions }
          onChange={e => {
            const selected = typeOptions[Number(e.detail.value)];
            setType(typeValueMap[selected]);
          }}>
            <Text>
              { type == null ? '选择类型' : (typeReverseMap[type] ?? 'invalid type') }
            </Text>
          </Picker>
        </View>

        <Picker
        mode="selector"
        range={ catOptions }
        onChange={e => setCategoryId(Number(e.detail.value) + 1)}
      >
          <View className="border border-gray-300 p-2 rounded text-gray-600">
            { categoryId == null ? '选择分类' : (catIdMap[categoryId] ?? 'invalid catgory') }
          </View>
        </Picker>

        <Button
          className="text-white rounded"
          style={{ backgroundColor: '#4169e1' }}
          onClick={() => {
            onSubmit({ title, amount: Number(amount), date, type, categoryId });
            onClose();
          }}>保存</Button>

        <Button className="bg-gray-300 text-black rounded" onClick={onClose}>取消</Button>
      </View>
      </View>
  );
};

export default AddRecordDrawer;

