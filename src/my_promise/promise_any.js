/**
 * input: iterable obj
 * output: Promise obj
 * 
 * 1. 如果 iterable obj 为空对象，则返回一个已经 rejected 的 Promise
 * 2. 如果 iterable obj 为不包含 promise，则返回一个异步的 resolve 的 Promise
 * 3. 其他情况，返回一个 pending 状态的 Promise。
 * 4. 当任何一个参数 promise 对象 resolve 时，这个 Promise 对象异步 resolve；
 *    当所有参数 Promise 对象都 reject 时，返回的 Promise reject。
*/

function promise_any(iterable) {
  let promiseArr = [...iterable].map(item => item instanceof Promise ? item : Promise.resolve(item))
  if (promiseArr.length === 0) return Promise.reject('Empty iterable object')
  return new Promise((resolve, reject) => {
    let count = 0
    for (let i in promiseArr) {
      promiseArr[i]
      .then(value => resolve(value))
      .catch(err => {
        count++
        if(count === promiseArr.length) reject('All promises rejected')
      })
    }
  })
}

module.exports = promise_any
