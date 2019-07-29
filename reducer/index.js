// Store 会把两个参数传入 reducer： 当前的 state 树和 action
// 返回新的state

export default (state = { data: []}, action) => {
  const {key, value} = action;

  // 判断 action 类型
  switch (action.type) {
    case 'SETRECORD':
      console.log(key, value)
      return {
        data: state.data.filter(item => item.key !== key).concat([{key, value}])
      };
    case 'DELRECORD':
      return {
        data: state.data.filter(item => item.key !== key)
      };

    default:
      return state
  }
};
