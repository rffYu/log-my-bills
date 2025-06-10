import Taro from '@tarojs/taro'
import { useState } from 'react'
import { View, Button, Text, Checkbox, CheckboxGroup } from '@tarojs/components'
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

  const onCheckChange = (e: any) => {
    setSelectedMonths(e.detail.value);
  };

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
      <Text className="text-lg font-semibold text-gray-800">选择月份（可多选）</Text>
      <CheckboxGroup onChange={onCheckChange}>
        <View style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {months.map((month) => (
            <Checkbox
              key={month.id}
              value={month.id}
              checked={selectedMonths.includes(month.id)}
              style={{ marginRight: 8 }}
            >
              <Text>{month.name}</Text>
            </Checkbox>
          ))}
        </View>
      </CheckboxGroup>

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

