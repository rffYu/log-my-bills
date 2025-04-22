import { Component, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import GlobalContainer from './components/GlobalContainer';
import store from './store'
import './app.scss'


class App extends Component<PropsWithChildren> {
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <>
          {this.props.children}
          <GlobalContainer />
        </>
      </Provider>
    )
  }
}

export default App
