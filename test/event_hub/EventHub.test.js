const EventHub = require('../../src/event_hub/EventHub.js')

describe("EventHub", () => {
  it("eventHub 是一个对象", () => {
    const eventHub = new EventHub()
    expect(eventHub).toBeInstanceOf(Object)
  })
  it(".on 之后 .emit 会触发 .on 的函数", () => {
    const eventHub = new EventHub()
    const mockFn = jest.fn(arg => null)
    eventHub.on('xxx', mockFn)
    eventHub.emit('xxx', 'data')
    expect(mockFn).toHaveBeenCalledOnce()
    expect(mockFn).toHaveBeenCalledWith('data')
  })
  it(".off 可以注销 .on 的事件", () => {
    const eventHub = new EventHub()
    const mockFn = jest.fn(arg => null)
    eventHub.on('yyy', mockFn)
    eventHub.off('yyy', mockFn)
    eventHub.emit('yyy')
    expect(mockFn).toHaveBeenCalledTimes(0)
  })
})