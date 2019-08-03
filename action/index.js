import { AsyncStorage } from 'react-native'
  
export const initList = () => {
  return async dispatch => {
    const keys = await AsyncStorage.getAllKeys()
    const list = await AsyncStorage.multiGet(keys)
    dispatch({
      type: 'INITLIST',
      list
    })
    return list
  }
}

export const setList = (list) => {
  return {
    type: 'SETLIST',
    list
  }
}

export const setRecord = (key, value) => {
  return {
    type: 'SETRECORD',
    key,
    value
  }
}

export const delRecord = (key) => {
  return {
    type: 'DELRECORD',
    key
  }
}
