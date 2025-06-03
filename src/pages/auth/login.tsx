import { View, Input, Button, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = () => {
    if (!email || !password) {
      Taro.showToast({ title: '请输入邮箱和密码', icon: 'none' })
      return
    }
    // Add login logic here (e.g. API call)
    Taro.showToast({ title: '登录成功', icon: 'success' })
  }

  return (
    <View className="auth-container">
      <Input placeholder="邮箱" value={email} onInput={e => setEmail(e.detail.value)} />
      <Input password placeholder="密码" value={password} onInput={e => setPassword(e.detail.value)} />
      <Button onClick={onLogin}>登录</Button>
      <Button onClick={() => Taro.navigateTo({ url: '/pages/auth/register' })}>注册</Button>
    </View>
  )
}

