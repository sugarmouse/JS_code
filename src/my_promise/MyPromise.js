const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'


class MyPromise {
  callbacks = []
  status = PENDING
  /**
   * If the promise is not pending, return. Otherwise, set the status to fulfilled and call the
   * callbacks
   * @param result - The result of the promise.
   * @returns A MyPromise object
   */
  resolve(result) {
    if (this.status !== PENDING) return
    this.status = FULFILLED
    nextTick(() => {
      this.callbacks.forEach(handle => {
        if (typeof handle[0] === "function") {
          let x
          try {
            x = handle[0].call(undefined, result)
          } catch (e) {
            return handle[2].reject(e)
          }
          handle[2].resolveWith(x)
        }
      })
    })
  }
  /**
   * If the promise is not pending, return. Otherwise, set the status to rejected, and then call the
   * callbacks
   * @param reason - The reason why the promise was rejected.
   * @returns A promise object
   */
  reject(reason) {
    if (this.status !== PENDING) return
    this.status = REJECTED
    nextTick(() => {
      this.callbacks.forEach(handle => {
        if (typeof handle[1] === "function") {
          let x
          try {
            x = handle[1].call(undefined, reason)
          } catch (e) {
            return handle[2].reject(e)
          }
          handle[2].resolveWith(x)
        }
      })
    })
  }
  constructor(fn) {
    if (typeof fn !== "function") {
      throw new TypeError("参数必须是一个函数")
    }
    fn(this.resolve.bind(this), this.reject.bind(this))
  }
  then(onFulfilled, onRejected) {
    const handle = []
    if (typeof onFulfilled === "function") {
      handle[0] = onFulfilled
    }
    if (typeof onRejected === "function") {
      handle[1] = onRejected
    }
    handle[2] = new MyPromise(() => { })
    this.callbacks.push(handle)
    return handle[2]
  }
 /**
  * If the value is a promise, resolve it or reject it, 
  * if it's an object with a then method, call it, 
  * otherwise resolve it
  * @param x - The value returned by the onFulfilled or onRejected callback.
  */
  resolveWith(x) {
    // 次方法主要是处理 onFulfilled 或者 onRejected 回调返回值与 then() 返回的新的 Promise 的关系
    // 也就是把 返回值 x 处理到一个新的 Promise 里，从而实现真正的链式调用
    // 这里的 this 是 then() 返回的 new Promise(()=>{})
    if (this === x) {
      this.reject(new TypeError())
    }
    else if (x instanceof MyPromise) {
      x.then(result => {
        this.resolve(result)
      }, reason => {
        this.reject(reason)
      })
    }
    else if (x instanceof Object) {
      // x 为对象但是不是 MyPromise 实例
      // 找 x 对象中有没有 x.then 方法
      let then
      try {
        then = x.then
      } catch (e) {
        this.reject(e)
      }
      if (then instanceof Function) {
        x.then((y) => {
          this.resolveWith(y)
        }, (r) => {
          this.reject(r)
        })
      } else {
        this.resolve(x)
      }
    }
    else {
      this.resolve(x)
    }
  }
}


/**
 * It uses MutationObserver in browser or process.nextTick() in Node 
 * to schedule a callback to be called on the next tick
 * @param fn - The function to be executed.
 */
function nextTick(fn) {
  if (typeof window !== 'undefined') {
    // 浏览器环境用 MutationObserver() 
    let counter = 1
    var observer = new MutationObserver(fn)
    let textNode = document.createTextNode(String(counter))
    observer.observe(textNode, {
      characterData: true
    })
    counter = counter + 1
    textNode.data = String(counter)
  } else {
    process.nextTick(fn)
  }
}


module.exports = MyPromise


