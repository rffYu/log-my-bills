import { View, Input, Button, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const onRegister = () => {
    if (!email || !password || !confirmPassword) {
      Taro.showToast({ title: '请填写所有字段', icon: 'none' })
      return
    }
    if (password !== confirmPassword) {
      Taro.showToast({ title: '两次密码不一致', icon: 'none' })
      return
    }
    // Add register logic here (e.g. API call)
    Taro.showToast({ title: '注册成功', icon: 'success' })
    Taro.navigateBack()
  }

  return (
    <View className="auth-container">
      <Input placeholder="邮箱" value={email} onInput={e => setEmail(e.detail.value)} />
      <Input password placeholder="密码" value={password} onInput={e => setPassword(e.detail.value)} />
      <Input password placeholder="确认密码" value={confirmPassword} onInput={e => setConfirmPassword(e.detail.value)} />
      <Button onClick={onRegister}>注册</Button>
    </View>
  )
}

