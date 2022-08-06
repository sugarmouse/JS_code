const throttle = require('../../src/t_and_d/throttle.js')

beforeEach(() => {
  jest.useFakeTimers()
})

describe('throttle test', () => {
  test("节流函数在一定时间内只会执行一次", () => {
    const mockFn = jest.fn(arg => null)
    const func = throttle(mockFn, 3)
    func()
    func()
    jest.runAllTimers()
    expect(mockFn).toHaveBeenCalledOnce()
  })

  test("节流函数在超出规定时间之后再次调用会再次执行", () => {
    const mockFn = jest.fn(arg => null)
    const func = throttle(mockFn, 3)
    func()
    func()
    setTimeout(()=>{
      func()
    },5000)
    jest.runAllTimers()
    expect(mockFn).toHaveBeenCalledTimes(2)
  })
})
