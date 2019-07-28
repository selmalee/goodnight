import { delRecord, setRecord } from '../action';

export default (state, action) => {
  const {key, value} = action;

  // 判断 action 类型
  switch (action.type) {
    case 'setRecord':
      return {
        ...state,
        data: data
          .filter(item => item.key !== key)
          .push({ key, value })
      };
    case 'delRecord':
      return {
        ...state,
        data: data.filter(item => item.key !== key)
      };

    default:
      return state
  }
};
