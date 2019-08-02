const sortFn = (a, b) => {
  if (a[0] > b[0]) {
    return 1
  } else {
    return -1
  }
}

const defaultState = {
  list: [],
  count: 0
}

// Store 会把两个参数传入 reducer： 当前的 state 树和 action
// 返回新的state

export default (state = defaultState, action) => {
  const {key, value} = action;

  // 判断 action 类型
  switch (action.type) {
    case 'INITLIST':
      const defaultList = [...action.list]
      defaultList.sort(sortFn)
      return {
        ...state,
        list: defaultList
      }
    case 'SETLIST':
      // const defaultList = [...action.list]
      // defaultList.sort(sortFn)
      return {
        ...state,
        list: [...action.list]
      }
    case 'SETRECORD':
      const list = state.list.filter(item => item[0] !== key).concat([[key, value]])
      list.sort(sortFn)
      // console.log(list, state.list)
      // console.log(list)
      return {
        ...state,
        list
      };
    case 'DELRECORD':
      return {
        ...state,
        list: state.list.filter(item => item[0] !== key)
      };
    case 'ADDCOUNT': 
      return {
        ...state,
        count: state.count + action.count
      }
    default:
      return state
  }
};
