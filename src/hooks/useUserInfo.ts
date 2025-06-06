import { useState } from 'react';
import Taro from '@tarojs/taro';
import request from '@/utils/request';

const useUserInfo = () => {
  const [userInfo, setInfo] = useState<string | null>(() => {
    return Taro.getStorageSync('userInfo') || null
  })

  const fetchUserInfo = async (): Promise<string | null> => {
    if (userInfo) return userInfo // Already cached

    const token = Taro.getStorageSync('token')
    if (!token) return null

    try {
      const res = await request('/api/user/info', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res?.data) {
        setInfo(res.data)
        Taro.setStorageSync('userInfo', res.data)
        return res.data
      }
    } catch (error) {
      console.error('Failed to fetch user info:', error)
    }

    return {};
  }

  return { userInfo, fetchUserInfo }
}

export default useUserInfo;

