import Taro from '@tarojs/taro';

export default function setMockStorage() {
  try{
    const mockStorage = require('../../.runtime-mock-storage.json');
    Object.entries(mockStorage).forEach(([key, value]) => {
      Taro.setStorageSync(key, value);
    });
    console.log('🧪 Loaded mock storage');
  } catch (err) {
    console.warn('⚠️ No mock storage injected');
  }
}

