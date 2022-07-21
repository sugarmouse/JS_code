/**
 * 非官方 API
 * 参数是返回 Promise 对象的函数构成的数组，和一个初始值
 * 返回一个 Promise 对象，当数组中函数里的 Promise 对象一次 resolve 之后 resolve
 * 
 * 其实就是将 promise 的链式调用封装成了一个函数
*/
function promise_queue(functionArr, initialParameter) {
  return new Promise((resolve, reject) => {
    let queue = Promise.resolve(initialParameter)
    functionArr.forEach(fn => {
      queue = queue.then(fn)
    })
    queue.then(resolve, reject)
  })
}

module.exports = promise_queue
