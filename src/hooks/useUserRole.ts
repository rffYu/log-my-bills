import { useState } from 'react'
import Taro from '@tarojs/taro'
import request from '@/utils/request'

const useUserRole = () => {
  const [role, setRole] = useState<string | null>(() => {
    return Taro.getStorageSync('userRole') || null
  })

  const fetchUserRole = async (): Promise<string | null> => {
    if (role) return role // Already cached

    const token = Taro.getStorageSync('token')
    if (!token) return null

    try {
      const res = await request('/api/user/role', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res?.role) {
        setRole(res.role)
        Taro.setStorageSync('userRole', res.role)
        return res.role
      }
    } catch (error) {
      console.error('Failed to fetch user role:', error)
    }

    return null
  }

  return { role, fetchUserRole }
}

export default useUserRole;

