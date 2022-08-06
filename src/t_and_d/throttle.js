
/**
 * If the timer is not set, call the function, set the timer, and return. If the timer is set, return.
 * @param fn - The function to be throttled.
 * @param time - The time in seconds that the function should wait before being executed again.
 * @param [context] - the context of the function
 * @returns A function that will call the function passed in as the first argument after the time
 * passed in as the second argument.
 */
function throttle(fn, time, context = undefined) {
  let timer = null
  return (...arg) => {
    if (timer) return
    fn.call(context, ...arg)
    timer = setTimeout(() => {
      timer = null
    }, time * 1000)
  }
}

module.exports = throttle
