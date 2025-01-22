export const genId = () => {
  return Math.floor(Math.random() * 9999999)
}

export const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

export function groupBy(xs, f) {
  return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {})
}

export function sumBy(arr, field) {
  return arr.map((p) => p[field]).reduce((a, b) => a + b, 0)
}

export function sortBy(xs, f) {
  return xs.slice().sort((a, b) => f(a) - f(b))
}

export function arrayOf(start = 0 as number, stop: number) {
  const arr = [] as number[]
  let i = start || 0
  for (i; i < stop; i++) {
    arr.push(i)
  }
  return arr
}

export function getTodayDataRange() {
  const startingOfToday = new Date().setHours(0, 0, 0, 0)
  const endOfToday = new Date().setHours(23, 59, 59, 999)
  return {
    gte: new Date(startingOfToday),
    lte: new Date(endOfToday),
  }
}

