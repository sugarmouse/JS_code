const debounce = require('../../src/t_and_d/debounce.js')

beforeEach(() => {
  jest.useFakeTimers()
})

describe('debounce test', () => {
  test("防抖函数多次在一定时间内多次触发只会执行一次", () => {
    const mockFn = jest.fn(arg => null)
    let func = debounce(mockFn, 3)
    func()
    func()
    jest.runAllTimers()
    expect(mockFn).toHaveBeenCalledOnce()
  })

  test("防抖函数多次在一定时间内多次触发会重新计时", () => {
    const mockFn = jest.fn(arg => null)
    const mockFn2 = jest.fn(arg => null)
    let func = debounce(mockFn, 3)
    func()
    setTimeout(() => {
      func()
    }, 2000)
    setTimeout(() => {
      mockFn2()
    }, 4000)
    jest.runAllTimers()
    expect(mockFn).toHaveBeenCalledOnce()
    expect(mockFn2).toHaveBeenCalledBefore(mockFn)
  })
})
