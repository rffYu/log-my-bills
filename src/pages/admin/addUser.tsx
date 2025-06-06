import { View, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react';

export default function AddUser() {
  const [openid, setOpenid] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!openid) {
      Taro.showToast({ title: '请输入 OpenID', icon: 'none' })
      return
    }

    setLoading(true)
    try {
      await Taro.request({
        url: '/api/admin/bind_user',
        method: 'POST',
        data: { openid },
        header: {
          Authorization: `Bearer ${Taro.getStorageSync('token')}`,
        },
      })
      Taro.showToast({ title: '绑定成功', icon: 'success' })
      Taro.navigateBack()
    } catch (err) {
      Taro.showToast({ title: '绑定失败', icon: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="p-4">
      <View className="mb-4">
        <Input
          className="border rounded px-3 py-2 w-full"
          placeholder="用户 OpenID"
          value={openid}
          onInput={e => setOpenid(e.detail.value)}
        />
      </View>
      <Button
        className="bg-green-500 text-white rounded"
        loading={loading}
        onClick={handleSubmit}
      >
        绑定用户
      </Button>
    </View>
  )
}

