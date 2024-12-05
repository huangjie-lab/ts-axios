const toString = Object.prototype.toString

export function isDate(val: any) {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any) {
  return val !== null && typeof val === 'object'
}

export function isPlainObject(val: any) {
  return toString.call(val) === '[object Object]'
}

// 将from中的属性拷贝到to中
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
