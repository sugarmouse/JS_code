
const MyPromise = require('../../src/my_promise/MyPromise.js')

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.clearAllMocks()
})


describe('MyPromise test', () => {
  test("1_MyPromise是一个class", () => {
    expect(/^class\b/.test(MyPromise)).toBe(true)
    expect(MyPromise.prototype).toEqual(expect.any(Object))
    expect(MyPromise).toEqual(expect.any(Function))
  })

  test("2_new MyPromise()必须接收一个函数作为参数", () => {
    expect(() => { new MyPromise() }).toThrow(TypeError)
    expect(() => { new MyPromise(2) }).toThrow(TypeError)
    expect(() => { new MyPromise("what") }).toThrow(TypeError)
    expect(() => { new MyPromise(true) }).toThrow(TypeError)
    expect(() => { new MyPromise() }).toThrow("参数必须是一个函数")
    expect(() => { new MyPromise(2) }).toThrow("参数必须是一个函数")
    expect(() => { new MyPromise("what") }).toThrow("参数必须是一个函数")
    expect(() => { new MyPromise(true) }).toThrow("参数必须是一个函数")
  })
  test("3_MyPromise实例需要有then方法", () => {
    const myPromise = new MyPromise(() => { })
    expect(myPromise.then).toEqual(expect.any(Function))
  })
  test("4_new MyPromise(fn)中的fn立即执行", () => {
    const mockCallback = jest.fn(x => 42 + x)
    new MyPromise(mockCallback)
    expect(mockCallback.mock.calls.length).toBe(1)

  })
  test("5_new MyPromise(fn)中的 fn 接收 resolve 和 reject 两个函数", () => {
    new MyPromise((resolve, reject) => {
      expect(resolve).toEqual(expect.any(Function))
      expect(reject).toEqual(expect.any(Function))
    })
  })
  test("6_promise.then(onFulfilled, onRejected)中的 onFulfilled 会在 resolve 被调用，且状态变为 fulfilled 之后执行", () => {
    const onFulfilled = jest.fn(() => { })
    const myPromise = new MyPromise((resolve, reject) => {
      expect(onFulfilled).not.toHaveBeenCalled()
      resolve()
    })
    myPromise.then(onFulfilled, null)
    jest.runAllTicks()
    expect(myPromise.status).toEqual('fulfilled')
    expect(onFulfilled).toHaveBeenCalledOnce()
  })

  test("7_promise.then(onFulfilled, onRejected)中的 onRejected 会在 reject 被调用,且状态变为 rejected 之后执行", () => {
    const onRejected = jest.fn(arg => null)
    const myPromise = new MyPromise((resolve, reject) => {
      expect(onRejected).not.toHaveBeenCalled()
      reject()
    })
    myPromise.then(null, onRejected)
    jest.runAllTicks()
    expect(myPromise.status).toEqual('rejected')
    expect(onRejected).toHaveBeenCalledOnce()
  })

  test("8_onFulfilled 和 onRejected 必须是函数，不是函数则忽略,且不报错", () => {
    const myPromise = new MyPromise((resolve, reject) => {
      resolve()
    })
    myPromise.then(false, null)
  })

  test("9_resolve 的第一个参数作为 onFulfilled 的第一个参数", () => {
    const onFulfilled = jest.fn(arg => null)
    const myPromise = new MyPromise((resolve, reject) => {
      resolve(1)
    })
    myPromise.then(onFulfilled)
    jest.runAllTicks()
    expect(onFulfilled).toHaveBeenCalledOnce()
    expect(onFulfilled).toHaveBeenCalledWith(1)

  })

  test("10_reject 的第一个参数作为 onRejected 的第一个参数", () => {
    const onRejected = jest.fn(arg => null)
    const myPromise = new MyPromise((resolve, reject) => {
      reject(1)
    })
    myPromise.then(null, onRejected)
    jest.runAllTicks()
    expect(onRejected).toHaveBeenCalledOnce()
    expect(onRejected).toHaveBeenCalledWith(1)
  })

  test("11_onFulfilled 和 onRejected 函数只能被调用一次", done => {
    const onFulfilled = jest.fn()
    const onRejected = jest.fn()
    const myPromise = new MyPromise((resolve, reject) => {
      resolve('result')
      resolve('second onFulfilled')
    })

    const myPromise2 = new MyPromise((resolve, reject) => {
      reject('reason')
      reject('second onRejected')
    })
    myPromise.then(onFulfilled, null)
    myPromise2.then(null, onRejected)


    jest.runAllTicks()

    expect(onFulfilled.mock.calls.length).toBe(1)
    expect(onFulfilled.mock.calls[0][0]).toBe('result')

    expect(onRejected.mock.calls.length).toBe(1)
    expect(onRejected.mock.calls[0][0]).toBe('reason')
    done()

  })

  test("12_在执行上下文堆栈仅包含平台代码之前,不能调用 onFulfilled", done => {
    const onFulfilled = jest.fn(x => null)
    const myPromise = new MyPromise((resolve, reject) => {
      resolve()
    })
    myPromise.then(onFulfilled)
    expect(onFulfilled).not.toHaveBeenCalled()
    jest.runAllTicks()
    expect(onFulfilled).toHaveBeenCalledOnce()
    done()
  })
  test("13_在执行上下文堆栈仅包含平台代码之前,不能调用 onRejected", done => {
    const onRejected = jest.fn(x => null)
    const myPromise = new MyPromise((resolve, reject) => {
      reject()
    })
    myPromise.then(null, onRejected)
    expect(onRejected).not.toHaveBeenCalled()
    jest.runAllTicks()
    expect(onRejected).toHaveBeenCalled()
    done()
  })
  test("14_保证 onFulfilled 调用时不带有 this 的值, this 为 undefined", () => {
    const myPromise = new MyPromise((resolve, reject) => {
      resolve()
    })
    myPromise.then(function () {
      "use strict"
      expect(this).toBe(null)
    }, null)
  })
  test("15_then 可以在一个 promise 里被多次调用, 且各个 onFulfilled 根据最原始的 .then 顺序执行", done => {
    const myPromise = new MyPromise((resolve) => {
      resolve()
    })
    const fn = [jest.fn(x => null), jest.fn(x => null), jest.fn(x => null)]
    myPromise.then(fn[0])
    myPromise.then(fn[1])
    myPromise.then(fn[2])
    jest.runAllTicks()
    expect(fn[0].mock.calls.length).toBe(1)
    expect(fn[1].mock.calls.length).toBe(1)
    expect(fn[2].mock.calls.length).toBe(1)
    expect(fn[0]).toHaveBeenCalledBefore(fn[1])
    expect(fn[1]).toHaveBeenCalledBefore(fn[2])
    done()
  })

  test("16_then 可以在一个 promise 里被多次调用, 且各个 onRejected 根据最原始的 .then 顺序执行", done => {
    const myPromise = new MyPromise((resolve, reject) => {
      reject()
    })
    const fn = [jest.fn(x => null), jest.fn(x => null), jest.fn(x => null)]
    myPromise.then(0, fn[0])
    myPromise.then(0, fn[1])
    myPromise.then(0, fn[2])
    jest.runAllTicks()
    expect(fn[0].mock.calls.length).toBe(1)
    expect(fn[1].mock.calls.length).toBe(1)
    expect(fn[2].mock.calls.length).toBe(1)
    expect(fn[0]).toHaveBeenCalledBefore(fn[1])
    expect(fn[1]).toHaveBeenCalledBefore(fn[2])
    done()
  })

  test("17_then()必须返回一个Promise", done => {
    const myPromise = new MyPromise((resolve, reject) => {
      resolve()
    })
    const myPromise2 = myPromise.then(() => { }, () => { })
    expect(myPromise2).toBeInstanceOf(MyPromise)
    done()
  })

  describe("_如果 then(onFulfilled, onRejected) 中的 onFulfilled 或者 onRejected 返回一个值 x ,运行 [[Resolve]](promise2, x)", () => {
    test("18_x 为非引用类型,可以传递给下一个then()", done => {
      const callBack = jest.fn(arg => null)
      const myPromise1 = new MyPromise(resolve => {
        resolve()
      })
      myPromise1
        .then(() => "success", () => { })
        .then(callBack)
      jest.runAllTicks()
      expect(callBack).toHaveBeenCalledWith('success')
      done()
    })

    test("19_x 为 onFulfilled 返回的一个 MyPromise ，且 x fulfilled", done => {
      // onFulfilled 返回 x 为 MyPromise 实例
      const myPromise1 = new MyPromise((resolve, reject) => {
        resolve()
      })
      const fn = jest.fn(x => null)
      myPromise1
        .then(() => new MyPromise((resolve, reject) => { resolve() }), () => { })
        .then(fn, null)
      jest.runAllTicks()
      expect(fn).toHaveBeenCalledTimes(1)
      done()
    })

    test("20_x 为 onFulfilled 返回的一个 MyPromise ，且 x rejected", done => {
      const myPromise1 = new MyPromise((resolve, reject) => {
        resolve()
      })
      const fn = jest.fn(x => null)
      myPromise1
        .then(() => new MyPromise((resolve, reject) => { reject() }), () => { })
        .then(null, fn)
      expect(fn).not.toBeCalled()
      jest.runAllTicks()
      expect(fn).toHaveBeenCalledOnce()
      done()
    })


    test("x 为 onRejected 返回的一个 MyPromise 实例，且 x fulfilled", done => {
      // onFulfilled 返回 x 为 MyPromise 实例
      const myPromise1 = new MyPromise((resolve, reject) => {
        reject()
      })
      const fn = jest.fn(arg => null)
      myPromise1
        .then(null, () => new MyPromise((resolve, reject) => { resolve() }))
        .then(fn, null)
      jest.runAllTicks()
      expect(fn).toHaveBeenCalledOnce()
      done()
    })

    test("x 为 onRejected 返回的一个 MyPromise 实例，且 x rejected", done => {
      const myPromise1 = new MyPromise((resolve, reject) => {
        reject()
      })
      const fn = jest.fn(arg => null)
      myPromise1
        .then(null, () => new MyPromise((resolve, reject) => { reject() }))
        .then(null, fn)
      jest.runAllTicks()
      expect(fn).toHaveBeenCalledOnce()
      done()
    })

    test("如果 onFulfilled  抛出一个异常, then() 返回的 MyPromise 必须拒绝", done => {
      const myPromise1 = new MyPromise((resolve, reject) => {
        resolve()
      })
      const fn = jest.fn()
      const error = new Error()
      const myPromise2 = myPromise1.then(() => {
        throw error
      })
      myPromise2.then(null, fn)
      jest.runAllTicks()
      expect(fn).toHaveBeenCalledOnce()
      expect(fn).toHaveBeenCalledWith(error)
      done()
    })

    test("如果 onRejected 抛出一个异常, then() 返回的 MyPromise 必须拒绝", done => {
      const myPromise1 = new MyPromise((resolve, reject) => {
        reject()
      })
      const fn = jest.fn()
      const error = new Error()
      const myPromise2 = myPromise1.then(null, () => {
        throw error
      })
      myPromise2.then(null, fn)
      jest.runAllTicks()
      expect(fn).toHaveBeenCalledOnce()
      expect(fn).toHaveBeenCalledWith(error)
      done()
    })

    test("如果 onFulfilled 返回一个包含 then 方法的 对象", done => {
      let isCalled = false
      const returnObj = {
        then: function () {
          isCalled = true
        }
      }
      const myPromise1 = new MyPromise((resolve) => {
        resolve()
      })
      myPromise1.then(() => returnObj)
      jest.runAllTicks()
      expect(isCalled).toBeTrue()
      done()
    })
  })
})
