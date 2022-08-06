
/**
 * "If a function is called, wait a certain amount of time before executing it."
 * 
 * The debounce function takes two arguments: a function and a time in seconds. It returns a new
 * function that will call the original function after a certain amount of time has passed
 * @param fn - The function to be debounced.
 * @param time - The time in seconds to wait before calling the function.
 * @returns A function that will call the passed in function after a certain amount of time.
 */
function debounce(fn, time) {
  let timer = null
  return (context = undefined, ...rest) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(context, ...rest)
      timer = null
    }, time * 1000)
  }
}

module.exports = debounce
