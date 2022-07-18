const promise_race = require('../../src/my_promise/promise_race.js')

describe('promise_race test', () => {
  test("都是 resolved 的 promise", () => {
    let p1 = new Promise(r => setTimeout(r, 3000, 1))
    let p2 = new Promise(r => setTimeout(r, 1000, 2))
    let p3 = new Promise(r => setTimeout(r, 2000, 3))
    expect(promise_race([p1, p2, p3])).resolves.toStrictEqual(2)
  })

  test("iterable 为字符串", () => {
    expect(promise_race('hello')).resolves.toMatch('h')
  })

  test("iterable 空数组", () => {
      
  })

  test('iterable 都为同步项', () => {
    expect(promise_race([Promise.resolve(2), 3])).resolves.toEqual(2)
  })
})
