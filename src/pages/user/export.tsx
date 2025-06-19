import Taro from '@tarojs/taro'
import { useState } from 'react'
import { View, Button, Text, Checkbox, CheckboxGroup } from '@tarojs/components'
import { API_HOST } from '@/constants'
import './export.scss'

const months = [
  { id: '01', name: '2025-01' },
  { id: '02', name: '2025-02' },
  { id: '03', name: '2025-03' },
  { id: '04', name: '2025-04' },
  { id: '05', name: '2025-05' },
  { id: '06', name: '2025-06' },
  { id: '07', name: '2025-07' },
  { id: '08', name: '2025-08' },
  { id: '09', name: '2025-09' },
  { id: '10', name: '2025-10' },
  { id: '11', name: '2025-11' },
  { id: '12', name: '2025-12' },
];

export default function ExportExcelPage() {
  const [loading, setLoading] = useState(false)
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const token = Taro.getStorageSync('token');

  const onCheckChange = (e: any) => {
    setSelectedMonths(e.detail.value);
  };

  const handleExport = async () => {
    if (!token) {
      Taro.showToast({ title: '请未登录', icon: 'none' })
      return
    }

    setLoading(true)
    try {
      const downloadRes = await new Promise<Taro.downloadFile.SuccessCallbackResult>((resolve, reject) => {
        Taro.downloadFile({
          url: `http://${API_HOST}/api/export/excel?month=2024-06`, // 或动态参数
          header: { Authorization: `Bearer ${token}` },
          success: res => res.statusCode === 200 ? resolve(res) : reject(new Error('下载失败')),
          fail: reject,
        })
      })

      const saveRes = await Taro.saveFile({ tempFilePath: downloadRes.tempFilePath })

      await Taro.openDocument({
        filePath: saveRes.savedFilePath,
        fileType: 'xlsx',
      })

      Taro.showToast({ title: '文件已打开', icon: 'success' })

    } catch (error) {
      console.error(error)
      Taro.showToast({ title: '导出失败', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="export-page p-6 space-y-4 min-h-screen bg-gray-50">
      <View>
        <Text className="text-lg font-semibold text-gray-800">导出数据为Excel</Text>
      </View>

      <View>
        <Text className="text-base font-semibold text-gray-800">选择月份（可多选）</Text>
        <CheckboxGroup onChange={onCheckChange}>
          <View style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {months.map((month) => (
              <Checkbox
                key={month.id}
                value={month.id}
                checked={selectedMonths.includes(month.id)}
                style={{ marginRight: 8 }}
              >
                <Text>{ month.name }</Text>
              </Checkbox>
            ))}
          </View>
        </CheckboxGroup>
      </View>

      <Button
        className="bg-blue-500 text-white px-4 py-2 m-4 rounded hover:bg-blue-600"
        loading={loading}
        onClick={handleExport}
      >
        导出 Excel
      </Button>
    </View>
  )
}

