
const promise_queue = require('../../src/my_promise/promise_queue.js')
describe('promise_queue test', () => {
  test("", () => {
    const f1 = x => x + 1
    const f2 = x => x + 2
    const f3 = x => x + 3
    const f4 = x => x + 4
    const f5 = x => x + 5
    expect(promise_queue([f1, f2, f3, f4, f5],0)).resolves.toBe(15)

  })
})
