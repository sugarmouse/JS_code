
/**
 * 
 * @param fn - 需要发起请求的函数，异步得到返回结果.
 * @param parameterArr - 异步请求函数所需要的参数
 * @param limit - 并发请求数的限制数量
 * @returns ```
 */
function async_pool(fn, parameterArr, limit) {
  let cunrrentcount = 0
  let results = []
  let settledCount = 0
  let args = [...parameterArr]
  let order = 0

  return new Promise((reslove, reject) => {
    function run() {
      while (cunrrentcount < limit && args.length) {
        cunrrentcount++
        ((i) => {
          let val = args.shift()
          fn(val).then(val => {
            results[i] = val
          })
          .catch(()=>{
            throw new Error(`${parameterArr[i]}数据获取失败`)
          })
          .finally(() => {
            cunrrentcount--
            settledCount++
            // resolve 的判断条件不能用 arg.length === 0 或者 results.length === parameter.length.
            // 因为请求是返回是异步的
            if (settledCount === parameterArr.length) {
              reslove(results)
            } else {
              run()
            }
          })
        })(order++)
      }
    }
    run()
  })
}

module.exports = async_pool
