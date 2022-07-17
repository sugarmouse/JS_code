
const promiseAll = require("/Users/mousesugar/Desktop/write_js/src/my_promise/promise_all.js")

describe('promiseAll', () => {
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
    await expect(promiseAll([p1, p2, p3])).resolves.toStrictEqual([1,2,3])
  })

  test("有 rejected 的 promise", async () => {
    let p1 = new Promise(r => setTimeout(r, 3000, 1))
    let p2 = new Promise((r, j) => setTimeout(j, 4000, 'err'))
    let p3 = new Promise(r => setTimeout(r, 2000, 3))
    await expect(promiseAll([p1, p2, p3])).rejects.toMatch('err')
  })

  test('iratable 为空',()=>{
    expect(promiseAll([])).resolves.toStrictEqual([])
  })

  test('iratable 为字符串',()=>{
    expect(promiseAll('hello')).resolves.toStrictEqual('hello'.split(''))
  })

})

