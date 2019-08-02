import Reducer from '../reducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
// 根据 reducer 初始化 store
// 使用指定的 middleware，action 创建函数除了返回 action 对象外还可以返回函数。这时，这个 action 创建函数就成为了 thunk
const store = createStore(
  Reducer,
  applyMiddleware(thunk)
)

export default store
