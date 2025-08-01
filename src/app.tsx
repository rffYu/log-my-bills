import { Component, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import setMockStorage from '@/utils/mockStorage';
if (process.env.NODE_ENV === 'development') {
  setMockStorage();
}
import store from './store'
import './app.scss'
import './tailwind.css'

class App extends Component<PropsWithChildren> {
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
