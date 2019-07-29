import Reducer from '../reducer';
import { createStore } from 'redux';
// 根据 reducer 初始化 store
const store = createStore(Reducer);

export default store
