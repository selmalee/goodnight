import { sortListFn } from '../utils'

const defaultState = {
  list: []
}

// Store 会把两个参数传入 reducer： 当前的 state 树和 action
// 返回新的state

export default (state = defaultState, action) => {
  const {key, value} = action;

  // 判断 action 类型
  switch (action.type) {
    case 'INITLIST':
      const defaultList = [...action.list]
      defaultList.sort(sortListFn)
      return {
        list: defaultList
      }
    case 'SETLIST':
      return {
        list: [...action.list]
      }
    case 'SETRECORD':
      const list = [...state.list.filter(item => item[0] !== key).concat([[key, value]])]
      list.sort(sortListFn)
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
