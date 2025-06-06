import { View, Text, Image, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import useUserInfo from '@/hooks/useUserInfo';
import defaultAvatar from '@/assets/avatar/default.jpg';

const UserPage = () => {
  const [token, setToken] = useState<string | null>(null);
  const { userInfo, fetchUserInfo } = useUserInfo()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initialize = async () => {
      const storedToken = Taro.getStorageSync('token');
      if (storedToken) {
        setToken(storedToken);
      }

      await fetchUserInfo();
      setLoading(false);
    };

    initialize();
  }, []);

  const handleLogout = () => {
    Taro.removeStorageSync('token');
    Taro.removeStorageSync('userInfo');
    setToken('');
    Taro.showToast({ title: '已退出登录', icon: 'none' });
  };

  if (loading) {
    return <View className="p-4 text-center text-gray-500">加载中...</View>
  }

  return (
    <View className="p-6 space-y-4">
      {token ? (
        <View className="space-y-4">
          {userInfo && (
            <View className="flex flex-col items-center space-y-2" style={ {display: "flex"} }>
              <Image
                src={ userInfo.avatar || defaultAvatar }
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
              <Text className="text-lg font-medium">昵称: {userInfo.nickname}</Text>
              <Text className="text-sm text-gray-500">OpenID: {userInfo.openid}</Text>
              <Text className="text-sm text-gray-600">角色: {userInfo.role}</Text>
            </View>
          )}

          <Button
            className="bg-red-500 text-white mt-2"
            onClick={handleLogout}
          >
            退出登录
          </Button>

          {userInfo.role === 'admin' && (
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

