import { useState } from 'react';
import { View, Input, Button, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';

interface Category {
  id: number;
  name: string;
}

export default function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: '吃饭' },
    { id: 2, name: '购物' },
  ]);

  const [newCategory, setNewCategory] = useState('');

  const addCategory = () => {
    if (!newCategory.trim()) {
      Taro.showToast({ title: '分类名不能为空', icon: 'none' });
      return;
    }

    const newId = Math.max(0, ...categories.map(c => c.id)) + 1;
    setCategories([...categories, { id: newId, name: newCategory }]);
    setNewCategory('');
  };

  const deleteCategory = (id: number) => {
    Taro.showModal({
      title: '确认删除',
      content: '删除后该分类将无法恢复，原分类账目将提示分类缺失。',
      success: res => {
        if (res.confirm) {
          setCategories(categories.filter(cat => cat.id !== id));
        }
      }
    });
  };

  return (
    <View className="category-manager">

      <View className="add-category">
        <Input
          placeholder="新分类名称"
          value={newCategory}
          onInput={e => setNewCategory(e.detail.value)}
        />
        <Button onClick={addCategory}>添加</Button>
      </View>

      <View className="category-list">
        {categories.map(cat => (
          <View key={cat.id} className="category-item">
            <Text>{cat.name}</Text>
            <Button size="mini" onClick={() => deleteCategory(cat.id)}>删除</Button>
          </View>
        ))}
      </View>
    </View>
  );
}

