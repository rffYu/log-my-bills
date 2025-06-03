import Taro from '@tarojs/taro'
import request from '@/utils/request'

const useLogin = () => {
  const login = async (): Promise<boolean> => {
    try {
      // Step 1: WeChat login to get the code
      const res = await Taro.login();
      const { code } = res;

      if (!code) {
        Taro.showToast({ title: '登录失败：无code', icon: 'none' });
        return false;
      }

      // Step 2: Send code to backend to exchange for token
      const result = await request('/api/login', {
        method: 'POST',
        data: { code },
      });

      // Step 3: Save token if returned
      if (result?.token) {
        Taro.setStorageSync('token', result.token);
        return true;
      } else {
        Taro.showToast({ title: '登录失败：无token', icon: 'none' });
        return false;
      }
    } catch (error) {
      console.error('Login failed', error);
      Taro.showToast({ title: '登录异常', icon: 'none' });
      return false;
    }
  };

  return { login };
};

export default useLogin;

