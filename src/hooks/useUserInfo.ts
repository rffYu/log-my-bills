import { useState } from 'react';
import Taro from '@tarojs/taro';
import request from '@/utils/request';

const useUserInfo = () => {
  const [userInfo, setInfo] = useState<object | null>(() => {
    return Taro.getStorageSync('userInfo') || null;
  });

  const fetchUserInfo = async (): Promise<object | null> => {
    if (userInfo) return userInfo // Already cached

    const token = Taro.getStorageSync('token')
    if (!token) return null;

    try {
      const data = await request('/api/user/info', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (data) {
        console.log("save userInfo to storage");
        Taro.setStorageSync('userInfo', data)
        setInfo(data);
        return data;
      }
    } catch (error) {
      console.error('Failed to fetch user info:', error)
    }

    return null;
  };

  const clearUserInfo = () => {
    setInfo(null);
    Taro.removeStorageSync('userInfo');
  };

  return { userInfo, fetchUserInfo, clearUserInfo };
};

export default useUserInfo;

