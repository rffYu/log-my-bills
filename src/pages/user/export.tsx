import { View, Button, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import './export.scss'

export default function ExportExcelPage() {
  const [loading, setLoading] = useState(false)

  const handleExport = async () => {
    setLoading(true)
    try {
      const res = await Taro.downloadFile({
        url: 'https://your-api.com/export/excel', // Replace with your real endpoint
        success: function (res) {
          if (res.statusCode === 200) {
            Taro.saveFile({
              tempFilePath: res.tempFilePath,
              success(fileRes) {
                Taro.openDocument({
                  filePath: fileRes.savedFilePath,
                  fileType: 'xlsx',
                  success: () => {
                    Taro.showToast({ title: '文件已打开', icon: 'success' })
                  },
                })
              },
            })
          } else {
            Taro.showToast({ title: '下载失败', icon: 'none' })
          }
        },
        fail() {
          Taro.showToast({ title: '下载出错', icon: 'none' })
        },
        complete() {
          setLoading(false)
        },
      })
    } catch (error) {
      console.error(error)
      Taro.showToast({ title: '导出失败', icon: 'none' })
      setLoading(false)
    }
  }

  return (
    <View className="export-page p-6 space-y-4 min-h-screen bg-gray-50">
      <Text className="text-lg font-semibold text-gray-800">导出数据为Excel</Text>
      <Button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        loading={loading}
        onClick={handleExport}
      >
        导出 Excel
      </Button>
    </View>
  )
}

