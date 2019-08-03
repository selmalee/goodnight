const formatNum = (num) => {
  return `${num > 9 ? '' : '0'}${num}`
}

export const getDate = (date) => {
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  return `${y}-${formatNum(m)}-${formatNum(d)}`
}

export const getTime = (date) => {
  const h = date.getHours()
  const m = date.getMinutes()
  // const s = date.getSeconds()
  // return `${formatNum(h)}:${formatNum(m)}:${formatNum(s)}`
  return `${formatNum(h)}:${formatNum(m)}`
}

export const sortListFn = (a, b) => {
  if (a[0] > b[0]) {
    return 1
  } else {
    return -1
  }
}
