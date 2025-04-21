import { View, Input, Button } from '@tarojs/components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createRecord } from '../../controllers/recordController';

const Add = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!title || !amount) return;
    createRecord(dispatch, { title, amount: parseFloat(amount) });
  };

  return (
    <View>
      <Input placeholder="账单名称" onInput={(e) => setTitle(e.detail.value)} />
      <Input placeholder="金额" type="digit" onInput={(e) => setAmount(e.detail.value)} />
      <Button onClick={handleAdd}>保存</Button>
    </View>
  );
};

export default Add;

