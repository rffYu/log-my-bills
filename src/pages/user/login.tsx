import { View, Input, Button, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import useLogin from '@/hooks/useLogin'
import './login.scss';

export default function LoginPage() {
  const { login } = useLogin();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const success = await login();
      if (success) {
        Taro.showToast({ title: '登录成功', icon: 'success' });
        Taro.redirectTo({ url: '/pages/index/index' });
      } else {
        Taro.showToast({ title: '登录失败', icon: 'none' });
      }
    } catch (err) {
      Taro.showToast({ title: '异常错误', icon: 'none' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="login-page flex flex-col justify-center items-center h-screen px-8">
      <Text className="text-4xl font-bold mb-12 text-gray-800">Hi!</Text>
      <Button
        loading={loading}
        onClick={handleLogin}
        type="primary"
        className="bg-green-500 text-white px-8 py-3 rounded-xl text-lg active:bg-green-600"
      >
        一键微信登录
      </Button>
    </View>
  );
}
