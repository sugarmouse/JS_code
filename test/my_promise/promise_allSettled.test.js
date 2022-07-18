
const promise_allSettled = require('../../src/my_promise/promise_allSettled.js')
describe('promise_allSettled test', () => {
  test("都是 settled 的 promise", async () => {
    let p1 = new Promise(r => setTimeout(r, 3000, 1))
    let p2 = new Promise(r => setTimeout(r, 1000, 2))
    let p3 = new Promise((r, j) => setTimeout(j, 2000, 'err'))

    let output = [
      { status: 'resolved', value: 1 },
      { status: 'resolved', value: 2 },
      { status: 'rejected', reason: 'err' }
    ]
    await expect(promise_allSettled([p1, p2, p3])).resolves.toStrictEqual(output)
  })

  test("输入字符串", async () => {
    let output = [
      { status: 'resolved', value: 'h' },
      { status: 'resolved', value: 'e' },
      { status: 'resolved', value: 'l' },
      { status: 'resolved', value: 'l' },
      { status: 'resolved', value: 'o' }
    ]
    await expect(promise_allSettled("hello")).resolves.toStrictEqual(output)
  })

  test("混合类型的数组", async () => {
    let output = [
      { status: 'resolved', value: 2 },
      { status: 'resolved', value: 3 },
      { status: 'rejected', reason: 4 }
    ]
    await expect(promise_allSettled([Promise.resolve(2),3,Promise.reject(4)])).resolves.toStrictEqual(output)
  })
  
})
