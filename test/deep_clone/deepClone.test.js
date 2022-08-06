
const exp = require('constants')
const deepClone = require('../../src/deep_clone/deepClone.js')
describe('deepClone test', () => {
  test("是个函数", () => {
    expect(deepClone).toStrictEqual(expect.any(Function))
  })
  test("能够复制基本类型", () => {
    const n = 1323
    expect(deepClone(n)).toEqual(n)
    const s = "deepClone"
    expect(deepClone(s)).toEqual(s)
    const b = true
    expect(deepClone(b)).toEqual(b)
    const u = undefined
    expect(deepClone(u)).toEqual(u)
    const empty = null
    expect(deepClone(empty)).toEqual(empty)
    const sym = Symbol()
    expect(deepClone(sym)).toEqual(sym)
  })
  describe("复制引用类型", () => {
    test("能够复制普通对象", () => {
      const a = { name: "father", age: 30, child: { name: "son", age: 8 } }
      const a2 = deepClone(a)
      expect(a).not.toBe(a2)
      expect(a.name).toEqual(a2.name)
      expect(a.age).toBe(a2.age)
      expect(a.child).not.toBe(a2.child)
      expect(a.child.name).toBe(a2.child.name)
    })
    test("能够复制数组", () => {
      const a = [[11, 12], [21, 22], [31, 32]]
      const a2 = deepClone(a)
      expect(a).not.toBe(a2)
      expect(a[0]).not.toBe(a2[0])
      expect(a[1]).not.toBe(a2[1])
      expect(a[2]).not.toBe(a2[2])
      expect(a).toEqual(a2)
    })
    test("能够复制函数", () => {
      const a = function (x, y) {
        return x + y
      }
      a.x = { y: { z: 1 } }
      const a2 = deepClone(a)
      expect(a).not.toBe(a2)
      expect(a.x).not.toBe(a2.x)
      expect(a.x.y).not.toBe(a2.x.y)
      expect(a.x.y.z).toBe(a2.x.y.z)
      expect(a(1, 2)).toBe(a2(1, 2))
    })
    test("能复制箭头函数", () => {
      const a = (x, y) => {
        return x + y
      }
      const a2 = deepClone(a)
      expect(a).not.toBe(a2)
      expect(a(2, 3)).toBe(a2(2, 3))
    })
    test("能复制环状结构", () => {
      const a = { name: "deep clone" }
      a.self = a
      const a2 = deepClone(a)
      expect(a.name).toBe(a2.name)
      expect(a.self).not.toBe(a2.self)
      expect(a.self).toBe(a)
      expect(a2.self).toBe(a2)
    })
    test("能复制Date", () => {
      const a = new Date()
      const a2 = deepClone(a)
      expect(a).not.toBe(a2)
      expect(a.getTime()).toBe(a2.getTime())
    })
    test("能复制RegExp", () => {
      const a = /test/gi
      const a2 = deepClone(a)
      expect(a).not.toBe(a2)
      expect(a.source).toBe(a2.source)
      expect(a.flags).toBe(a2.flags)
    })
    test("不会复制原型上的属性", () => {
      const a = Object.create({ status: "success" })
      const a2 = deepClone(a)
      expect(a2.status).toBeUndefined()
    })
  })
})
