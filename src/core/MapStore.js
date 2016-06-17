import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './RootReducer'

//applyMiddleware 应用中间件来包装 store 的 dispatch. 有时间研究下源码，很有意思，10行左右的代码应用了很多函数式的思想
//thunk作用是使被 dispatch 的 function 会接收 dispatch 作为参数，并且可以异步调用它
const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore)

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState)

  //热替换选项
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./RootReducer', () => {
      const nextReducer = require('./RootReducer')
      store.replaceReducer(nextReducer)
    })
  }
  return store
}

// // 每次 state 更新时，打印日志
// // 注意 subscribe() 返回一个函数用来注销监听器
// let unsubscribe = store.subscribe(() =>
//   console.log(store.getState())
// )