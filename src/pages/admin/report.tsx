import { View, Text, Picker } from '@tarojs/components'
import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { Button } from '@taroify/core'
import dayjs from 'dayjs'
import request from '@/utils/request';

const ReportPage = () => {
  const [mainUserId, setMainUserId] = useState('')
  const [month, setMonth] = useState(dayjs().format('YYYY-MM'))
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [monthOptions, setMonthOptions] = useState<string[]>([])

  const fetchData = async () => {
    setLoading(true)
    const token = Taro.getStorageSync('token')
    try {
      const res = await request(
        '/admin/report/summary', {
        method: 'GET',
        data: { mainUser: mainUserId, month },
        header: { Authorization: `Bearer ${token}` },
      })

      if (res?.data) {
        setData(res.data)
      } else {
        Taro.showToast({ title: '数据获取失败', icon: 'none' })
      }
    } catch (err) {
      console.error(err)
      Taro.showToast({ title: '请求错误', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const userInfo = Taro.getStorageSync('userInfo')
    if (userInfo?.mainUserId) setMainUserId(userInfo.mainUserId)

    const months = Array.from({ length: 12 }, (_, i) =>
      dayjs().subtract(i, 'month').format('YYYY-MM')
    )
    setMonthOptions(months)
  }, [])

  useEffect(() => {
    if (mainUserId) fetchData()
  }, [mainUserId, month])

  const totalSpent = data?.byUser?.reduce((sum, u) => sum + u.total, 0) || 0
  const topSpender = data?.byUser?.reduce((max, u) => u.total > max.total ? u : max, data.byUser?.[0] || {})
  const topCategory = data?.byCategory?.reduce((max, c) => c.total > max.total ? c : max, data.byCategory?.[0] || {})

  return (
    <View className="p-4 space-y-4 bg-gray-50 min-h-screen" style={{ padding: '1rem' }}>
      <Text className="text-xl font-bold text-gray-800">成员收支报表</Text>

      {/* Month Picker */}
      <View className="bg-white rounded p-2 shadow" style={{ padding: '0.5rem' }}>
        <Picker
          mode="selector"
          range={monthOptions}
          onChange={(e) => setMonth(monthOptions[e.detail.value])}
        >
          <View className="text-blue-600">{month} ▼</View>
        </Picker>
      </View>

      {/* Summary */}
      <View className="space-y-2" style={{ marginTop: "0.5rem" }}>
        <View className="p-2 rounded bg-green-100 flex justify-between"
            style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem" }}>
          <Text className="font-semibold text-green-800">本月总支出</Text>
          <Text className="font-semibold text-green-800">{totalSpent.toFixed(2)} 元</Text>
        </View>
      </View>

      {/* User Breakdown */}
      <View className="mt-4" style={{ marginTop: "1rem" }}>
        {topSpender?.nickname && (
          <View className="p-2 rounded bg-yellow-100 flex justify-between"
            style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem" }}>
            <Text className="font-semibold text-yellow-800">消费最多</Text>
            <Text className="font-semibold text-yellow-800">{topSpender.nickname} ({topSpender.total.toFixed(2)} 元)</Text>
          </View>
        )}
        <Text className="text-base font-semibold mb-2" style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>成员消费明细</Text>
        <View className="bg-white rounded shadow divide-y divide-gray-100">
          {data?.byUser?.map(u => (
            <View key={u.userId}
              className="flex justify-between px-4 py-2"
              style={{ display: "flex", justifyContent: "space-between"  }}>
              <Text>{u.nickname}</Text>
              <Text>{u.total.toFixed(2)} 元</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Category Breakdown */}
      <View className="mt-4" style={{ marginTop: "1rem" }}>
        {topCategory?.categoryName && (
          <View className="p-2 rounded bg-purple-100 flex justify-between"
            style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem" }}>
            <Text className="font-semibold text-purple-800">最大支出分类</Text>
            <Text className="font-semibold text-purple-800">{topCategory.categoryName} ({topCategory.total.toFixed(2)} 元)</Text>
          </View>
        )}

        <Text className="text-base font-semibold mb-2" style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>分类支出详情</Text>
        <View className="bg-white rounded shadow divide-y divide-gray-100">
          {data?.byCategory?.map(c => (
            <View key={c.categoryName}
              className="flex justify-between px-4 py-2"
              style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem" }}>
              <Text>{c.categoryName}</Text>
              <Text>{c.total.toFixed(2)} 元</Text>
            </View>
          ))}
        </View>
      </View>

    </View>
  )
}

export default ReportPage
