
function promise_race(iterableArr) {
  // src code
  let promiseArr = [...iterableArr].map(item => item instanceof Promise ? item : Promise.resolve(item))
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promiseArr.length; i++) {
      promiseArr[i].then(res => resolve(res), err => reject(err))
    }
  })

}

module.exports = promise_race
