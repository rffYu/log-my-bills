import Taro from '@tarojs/taro'
import { API_HOST } from '@/constants'

// const BASE_URL = 'https://your.api.server.com'; // Replace with your backend URL
const BASE_URL = API_HOST;

const request = async (url: string, options: Taro.request.Option = {}) => {
  const token = Taro.getStorageSync('token');

  return Taro.request({
    url: `${BASE_URL}${url}`,
    method: options.method || 'GET',
    data: options.data || {},
    header: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.header || {}),
    },
    timeout: 10000,
  }).then(res => {
    const { statusCode, data } = res;

    if (statusCode === 200) {
      return data;
    } else {
      Taro.showToast({
        title: `请求错误: ${statusCode}`,
        icon: 'none',
      });
      return Promise.reject(data);
    }
  }).catch(error => {
    Taro.showToast({
      title: '网络异常',
      icon: 'none',
    });
    return Promise.reject(error);
  });
};

export default request;

