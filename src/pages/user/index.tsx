import { View, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';

const UserPage = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = Taro.getStorageSync('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    Taro.clearStorageSync();
    Taro.showToast({ title: '已退出登录', icon: 'none' });
    Taro.redirectTo({ url: '/pages/user/login' });
  };

  return (
    <View className="user-page">
      <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>用户中心</Text>

      {token ? (
        <View style={{ marginTop: '20px' }}>
          <Text>当前已登录</Text>
          <Text style={{ fontSize: '12px', color: '#888' }}>Token: {token}</Text>
          <Button
            style={{ backgroundColor: 'red', color: 'white', marginTop: '20px' }}
            onClick={handleLogout}
          >
            退出登录
          </Button>
        </View>
      ) : (
        <View style={{ marginTop: '20px' }}>
          <Text>未登录</Text>
          <Button
            style={{ marginTop: '10px' }}
            onClick={() => Taro.redirectTo({ url: '/pages/user/login' })}
          >
            去登录
          </Button>
        </View>
      )}
    </View>
  );
};

export default UserPage;

