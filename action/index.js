export const setRecord = (key, value) => {
  return {
    type: setRecord,
    key,
    value
  }
}

export const delRecord = (key) => {
  return {
    type: delRecord,
    key
  }
}
