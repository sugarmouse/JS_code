promiseAll = function (iteralbe) {
  let promiseArr = [...iteralbe].map(item => item instanceof Promise ? item : Promise.resolve(item))
  if (promiseArr.length === 0) return Promise.resolve([])

  return new Promise((resolve, reject) => {
    const result = []
    let count = 0
    for (let i in promiseArr) {
      promiseArr[i]
        .then(val => {
          result[i] = val
          count++
          if (count === promiseArr.length) resolve(result)
        }).catch(err => reject(err))
    }
  })
}

module.exports = promiseAll
