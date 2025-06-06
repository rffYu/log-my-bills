import { View, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react';

export default function DeleteUser() {
  const [openid, setOpenid] = useState('')

  const handleDelete = async () => {
    try {
      await Taro.request({
        url: '/api/admin/delete_user',
        method: 'POST',
        data: { openid },
        header: {
          Authorization: `Bearer ${Taro.getStorageSync('token')}`,
        },
      })
      Taro.showToast({ title: '删除成功', icon: 'success' })
      Taro.navigateBack()
    } catch (err) {
      Taro.showToast({ title: '删除失败', icon: 'error' })
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
      <Button className="m-2 p-2 bg-red-500 text-white rounded" onClick={handleDelete}>
        删除用户
      </Button>
    </View>
  )
}

