
const promise_last = require("/Users/mousesugar/Desktop/write_js/src/my_promise/promise_last.js")

describe('promise_last', () => {
  beforeAll(done => {
    done()
  })

  afterAll(done => {
    done()
  })

  test("多个resolve的promise", async () => {
    let p1 = new Promise(r => setTimeout(r, 3000, 1))
    let p2 = new Promise(r => setTimeout(r, 1000, 2))
    let p3 = new Promise(r => setTimeout(r, 2000, 3))
    await expect(promise_last([p1, p2, p3])).resolves.toStrictEqual(1)
  })

  test("有 rejected 的 promise", async () => {
    let p1 = new Promise(r => setTimeout(r, 3000, 1))
    let p2 = new Promise((r, j) => setTimeout(j, 4000, 'err'))
    let p3 = new Promise(r => setTimeout(r, 2000, 3))
    await expect(promise_last([p1, p2, p3])).resolves.toStrictEqual(1)
  })

  test('iratable 为空',()=>{
    expect(promise_last([])).rejects.toStrictEqual('empty iterable object')
  })

  test('iratable 为字符串',()=>{
    expect(promise_last('hello')).resolves.toStrictEqual('o')
  })

  test("所有的 promise 都 reject", async () => {
    let p1 = new Promise((r,j) => setTimeout(j, 3000, 1))
    let p2 = new Promise((r, j) => setTimeout(j, 4000, 'err'))
    let p3 = new Promise((r,j) => setTimeout(j , 2000, 3))
    await expect(promise_last([p1, p2, p3])).rejects.toStrictEqual('All Promise rejected')
  })

})

