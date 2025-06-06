import { View, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import useUserRole from '@/hooks/useUserRole';

const UserPage = () => {
  const [token, setToken] = useState<string | null>(null);
  const { role, fetchUserRole } = useUserRole()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initialize = async () => {
      const storedToken = Taro.getStorageSync('token');
      if (storedToken) {
        setToken(storedToken);
      }

      await fetchUserRole();
      setLoading(false);
    };

    initialize();
  }, []);

  const handleLogout = () => {
    Taro.removeStorageSync('token');
    Taro.removeStorageSync('userRole');
    setToken('');
    setRole(null);
    Taro.showToast({ title: '已退出登录', icon: 'none' });
  };

  if (loading) {
    return <View className="p-4 text-center text-gray-500">加载中...</View>
  }

  return (
    <View className="p-6 space-y-4">
      {token ? (
        <View className="space-y-4">
          <Text className="text-lg font-semibold">当前已登录</Text>
          <Text className="text-sm text-gray-500 break-all">Token: {token}</Text>
          <Text className="text-sm text-gray-500">角色: {role || '未知'}</Text>

          <Button
            className="bg-red-500 text-white mt-2"
            onClick={handleLogout}
          >
            退出登录
          </Button>

          {role === 'admin' && (
            <View className="mt-6 space-y-2">
              <Text className="font-semibold text-gray-700">管理员功能</Text>
              <Button
                className="bg-blue-500 text-white"
                onClick={() => Taro.navigateTo({ url: '/pages/admin/addUser' })}
              >
                绑定用户
              </Button>
              <Button
                className="bg-blue-500 text-white"
                onClick={() => Taro.navigateTo({ url: '/pages/admin/deleteUser' })}
              >
                删除用户
              </Button>
            </View>
          )}
        </View>
      ) : (
        <View className="space-y-4">
          <Text className="text-gray-600">未登录</Text>
          <Button
            className="bg-green-500 text-white"
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

