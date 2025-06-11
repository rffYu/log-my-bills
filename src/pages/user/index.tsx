import { View, Text, Image, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import useUserInfo from '@/hooks/useUserInfo';
import defaultAvatar from '@/assets/avatar/default.jpg';
import './index.scss';

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
    <View className="user-page bg-gray-50 min-h-screen p-4">
      {token ? (
        <View className="space-y-6">
          {/* 用户信息卡片 */}
          <View className="box p-6 rounded-2xl bg-white shadow-md flex flex-col items-center space-y-4" style={{ display: "flex" }}>
            <Image
              src={userInfo.avatar || defaultAvatar}
              style={{
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
            <Text className="text-xl font-bold text-gray-800">昵称：{userInfo.nickname}</Text>
            <Text className="text-sm text-gray-500 break-all">OpenID：{userInfo.openid}</Text>
            <Text className="text-sm text-gray-600">角色：{userInfo.role}</Text>

            <Button
              className="w-full bg-gray-200 text-black text-base m-2 p-2 rounded-md hover:bg-gray-300"
              onClick={() => {
                // 这里替换成你的 rsync 逻辑
                Taro.showToast({ title: '正在同步...', icon: 'loading' });
                // 模拟异步任务
                setTimeout(() => {
                  Taro.showToast({ title: '同步完成', icon: 'success' });
                }, 1500);
              }}
            >
              同步数据
            </Button>

            <Button
              className="w-full bg-gray-200 text-black text-base m-2 p-2 rounded-md shadow hover:bg-gray-300"
              onClick={() => Taro.navigateTo({ url: '/pages/user/export' })}
            >
              导出数据
            </Button>

            <Button
              className="w-full bg-gray-200 text-black text-base m-2 p-2 rounded-md shadow hover:bg-gray-300"
              onClick={handleLogout}
            >
              退出登录
            </Button>
          </View>

          {/* 管理员功能 */}
          {userInfo.role === 'admin' && (
            <View className="box p-6 rounded-2xl bg-white shadow-md space-y-4">
              <Text className="text-lg font-semibold text-gray-800">管理员功能</Text>

              <Button
                className="w-full bg-gray-200 text-black text-base m-2 p-2 rounded-md hover:bg-gray-300"
                onClick={() => Taro.navigateTo({ url: '/pages/admin/report' })}
              >
                查看多用户报表
              </Button>

              <Button
                className="w-full bg-gray-200 text-black text-base m-2 p-2 rounded-md hover:bg-gray-300"
                onClick={() => Taro.navigateTo({ url: '/pages/admin/addUser' })}
              >
                绑定用户
              </Button>

              <Button
                className="w-full bg-gray-200 text-black text-base m-2 p-2 rounded-md hover:bg-gray-300"
                onClick={() => Taro.navigateTo({ url: '/pages/admin/deleteUser' })}
              >
                删除用户
              </Button>
            </View>
          )}
        </View>
      ) : (
          <View className="space-y-4 text-center mt-24">
            <Text className="text-gray-600 text-lg">未登录</Text>
            <Button
              className="text-black px-6 m-2 p-2 bg-gray-200 text-black rounded-md shadow hover:bg-gray-300"
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

