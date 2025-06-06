import { View, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react';

export default function AddUser() {
  const [openid, setOpenid] = useState('')
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);

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

  const chooseFile = () => {
    Taro.chooseMessageFile({
      count: 1,
      type: 'file',
      extension: ['xls', 'xlsx'],
      success: res => {
        if (res.tempFiles.length > 0) {
          const file = res.tempFiles[0];
          setFileName(file.name);
          uploadFile(file);
        }
      },
      fail: () => {
        Taro.showToast({ title: '选择文件失败', icon: 'error' });
      }
    });
  };

  const uploadFile = async (file) => {
    setUploading(true);
    try {
      const res = await Taro.uploadFile({
        url: 'https://your-backend.com/api/upload', // Replace with your backend API
        filePath: file.path,
        name: 'file',
        header: {
          // add auth header if needed
        },
      });
      const data = JSON.parse(res.data);
      if (data.success) {
        Taro.showToast({ title: '上传成功', icon: 'success' });
      } else {
        Taro.showToast({ title: '上传失败', icon: 'error' });
      }
    } catch (e) {
      Taro.showToast({ title: '上传出错', icon: 'error' });
    }
    setUploading(false);
  };

  return (
    <View className="p-4">
      <View className="mb-4">
        <Input
          className="border rounded p-3 m-3"
          placeholder="用户 OpenID"
          value={openid}
          onInput={e => setOpenid(e.detail.value)}
        />
      </View>

      <Button
        className="m-2 p-2 bg-green-500 text-white rounded"
        loading={loading}
        onClick={handleSubmit}
      >
        绑定用户
      </Button>

      <Button
        className="m-2 p-2 bg-gray-200 text-gray-600 rounded"
        onClick={chooseFile}
        disabled={uploading}
      >
        {uploading ? '上传中...' : '选择并上传Excel文件'}
      </Button>
      {fileName && <Text className="mt-2 text-gray-600">已选择文件: {fileName}</Text>}

    </View>
  )
}

