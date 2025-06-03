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
    <View className="login-page">
      <Text className="title">Hi!</Text>
      <Button loading={loading} onClick={handleLogin} type="primary">
        一键微信登录
      </Button>
    </View>
  );
}
