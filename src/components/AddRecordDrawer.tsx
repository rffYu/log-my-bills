import { View, Text, Input, Button, Picker } from '@tarojs/components';
import { useState } from 'react';
import RecordItem from '@/models/recordModel';
import './AddRecordDrawer.scss';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<RecordItem>) => void;
}

const AddRecordDrawer = ({ visible, onClose, onSubmit }: Props) => {
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState(1); // example default

  if (!visible) return null;

  return (
    <View className="add-record-drawer">
      <View className="drawer-content">
        <Text>添加记录</Text>
        <Input value={title} onInput={e => setTitle(e.detail.value)} placeholder="标题" />
        <Input type="number" value={amount} onInput={e => setAmount(e.detail.value)} placeholder="金额" />
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

