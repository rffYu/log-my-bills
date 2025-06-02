import Taro from '@tarojs/taro';
import { View, Text, Input, Button, Picker } from '@tarojs/components';
import { useState } from 'react';
import { useCategoryRecordViewModel } from '@/viewmodels/catRecVM';
import RecordItem from '@/models/recordModel';

function verifyInput(title: string, amount: string | number, categoryId: number | null, date: string, type: number | null): string | null {
  if (!title.trim()) return "标题不能为空";
  if (!amount) return "金额不能为空";
  if (isNaN(Number(amount))) return "金额格式错误";
  if (categoryId === null || isNaN(categoryId)) return "请选择分类";
  if (!date) return "请选择日期";
  if (type === null) return "请选择类型";
  return null;
}

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
            <View>{ type == null ? '选择类型' : (typeReverseMap[type] ?? 'invalid type') }</View>
          </Picker>
        </View>

        <View className="cat-picker">
          <Picker
            mode="selector"
            range={ catOptions }
            onChange={e => setCategoryId(Number(e.detail.value) + 1)}
          >
            <View>{ categoryId == null ? '选择分类' : (catIdMap[categoryId] ?? 'invalid catgory') }</View>
          </Picker>
        </View>

        <Button
        onClick={() => {
          const error = verifyInput(title, amount, categoryId, date, type);
          if (error) {
            Taro.showToast({ title: error, icon: 'none' });
            return;
          }
          onSubmit({ title, amount: Number(amount), categoryId });
          onClose();
        }}>保存</Button>
        <Button onClick={onClose}>取消</Button>
      </View>
    </View>
  );
};

export default AddRecordDrawer;

