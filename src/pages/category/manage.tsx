import { useState } from 'react';
import { View, Input, Button, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './manage.scss';

interface Category {
  id: number;
  name: string;
}

const defaultCategories = [
  { "id": 1, "name": "餐饮" },
  { "id": 2, "name": "交通" },
  { "id": 3, "name": "生活" },
  { "id": 4, "name": "收入" }
];

export default function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>(defaultCategories);

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
    <View className="category-manager-page p-4 space-y-6 bg-gray-50 min-h-screen">
      <View className="add-category flex space-x-2">
        <Input
          className="flex-1 border border-gray-300 rounded px-3 py-2 bg-white"
          placeholder="新分类名称"
          value={newCategory}
          onInput={e => setNewCategory(e.detail.value)}
        />
        <Button
          className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600"
          onClick={addCategory}
        >
          添加
        </Button>
      </View>

      <View className="category-list space-y-3">
        {categories.map(cat => (
          <View
            key={cat.id}
            className="category-item flex justify-between items-center p-3 bg-white rounded shadow"
            style={{display: "flex", justifyContent: "space-between"}}
          >
            <Text className="text-gray-800 text-base">{cat.name}</Text>
            <Button
              className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
              size="mini"
              onClick={() => deleteCategory(cat.id)}
            >
              删除
            </Button>
          </View>
        ))}
      </View>
    </View>
  );
}

