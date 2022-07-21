
const promise_any = require('../../src/my_promise/promise_any.js')
describe('promise_any test', () => {
  test("都是 promise item", async () => {
    let p1 = new Promise(r => setTimeout(r, 3000, 1))
    let p2 = new Promise(r => setTimeout(r, 1000, 2))
    let p3 = new Promise((r, j) => setTimeout(j, 2000, 'err'))
    await expect(promise_any([p1, p2, p3])).resolves.toStrictEqual(2)
  })

  test("都是 rejected 的 promise item", async () => {
    let p1 = new Promise((r, j) => setTimeout(j, 3000, 1))
    let p2 = new Promise((r, j) => setTimeout(j, 1000, 2))
    let p3 = new Promise((r, j) => setTimeout(j, 2000, 'err'))
    await expect(promise_any([p1, p2, p3])).rejects.toStrictEqual('All promises rejected')
  })

  test("输入字符串", async () => {
    await expect(promise_any("hello")).resolves.toStrictEqual('h')
  })

  test("输入为空对象", async () => {
    await expect(promise_any([])).rejects.toStrictEqual('Empty iterable object')
  })

  test("混合类型的数组", async () => {
    await expect(promise_any([Promise.resolve(2), 3, Promise.reject(4)])).resolves.toStrictEqual(2)
  })

})
