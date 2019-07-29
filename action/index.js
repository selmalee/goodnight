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
