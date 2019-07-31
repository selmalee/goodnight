
import { AsyncStorage } from 'react-native'
  
const sortFn = (a, b) => {
  if (a[0] > b[0]) {
    return 1
  } else {
    return -1
  }
}

let defaultList
(async() => {
  const keys = await AsyncStorage.getAllKeys()
  defaultList = await AsyncStorage.multiGet(keys)
})()

// Store 会把两个参数传入 reducer： 当前的 state 树和 action
// 返回新的state


export default (state = { list: defaultList}, action) => {
  const {key, value} = action;

  // 判断 action 类型
  switch (action.type) {
    case 'SETRECORD':
      const list = state.list.filter(item => item[0] !== key).concat([[key, value]])
      list.sort(sortFn)
      return {
        list
      };
    case 'DELRECORD':
      return {
        list: state.list.filter(item => item[0] !== key)
      };

    default:
      return state
  }
};
