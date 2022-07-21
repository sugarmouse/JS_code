// 非官方 Promise 自带方法
// 找到最后一个 fullfilled 的 Promise；都失败的时候则 reject

/**
 * 
*/

function promise_last(iterable) {
  let promiseArr = [...iterable].map(item => item instanceof Promise ? item : Promise.resolve(item))
  if (promiseArr.length === 0) return Promise.reject('empty iterable object')
  return new Promise((resolve, reject) => {
    let rejectedCount = 0
    let resolveCount = 0
    let lastResolvedValue = null
    for (let i in promiseArr) {
      promiseArr[i]
        .then(value => {
          resolveCount++
          lastResolvedValue = value
        })
        .catch(() => {
          rejectedCount++
        })
        .finally(() => {
          if (rejectedCount === promiseArr.length) {
            reject('All Promise rejected')
          } else if (rejectedCount + resolveCount === promiseArr.length) {
            resolve(lastResolvedValue)
          }
        })
    }
  })

}

module.exports = promise_last
