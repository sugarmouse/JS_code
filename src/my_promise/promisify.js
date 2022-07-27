// 把一个包含异步回调的函数 Promise 化

/**
 * It takes a function that accepts a callback as its last argument, and returns a function that
 * returns a promise
 * @param fn - The function to promisify
 * @param context - The context to bind the function to.
 * @returns A function that returns a promise.
 */
function promisify(fn, context) {
  return function (...arguments) {
    return new Promise((resolve, reject) => {
      fn.bind(context)(...arguments, function (err, val) {
        if (err !== null) reject(err)
        else resolve(val)
      })
    })
  }
}

module.exports = promisify


