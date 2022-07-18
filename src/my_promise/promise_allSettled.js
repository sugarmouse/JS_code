/**
 * input：iterable 对象
 * output：一个在所有给定的 Promise 都已经 fullfilled 或者 rejected 后的 Promise，
 *        并且带有一个对象数组，每个对象表示对应的 Promise 结果
*/
function promise_allSettled(iterable) {
  let promiseArr = [...iterable].map(item => item instanceof Promise ? item : Promise.resolve(item))
  if (promiseArr.length === 0) return Promise.resolve([])

  return new Promise((resolve, reject) => {
    let count = 0
    const result = []
    for (let i in promiseArr) {
      promiseArr[i]
        .then(value => result[i] = { status: 'resolved', value })
        .catch(reason => result[i] = { status: 'rejected', reason })
        .finally(()=> {
          count++
          if(count === promiseArr.length) {
            resolve(result)
          }
        })
    }
  })


}

module.exports = promise_allSettled
