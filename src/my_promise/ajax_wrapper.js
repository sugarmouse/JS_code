/**
 * It takes a url, a method, and data, and returns a promise that resolves to the data returned by the
 * server
 * @param [url] - the url to make the request to
 * @param [method=GET] - The HTTP method to use. Defaults to GET.
 * @param [data] - the data to be sent to the server
 * @returns A promise
 */
function ajax_wrapper(url = '', method = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    let options = {method}
    if (method==='GET') {
      url +="?" + Object.entries(data).map(arr => arr[0] + '=' + arr[1].join('&'))
    } else if(method==='POST') {
      options.body = JSON.stringify(data)
      options.header = {'Content-Type':'application/json'}
    }

    fetch(url, options).then(res => res.json()) 
    .then(data => resolve(data))
    .catch(e => reject(e))
  })
} 


module.exports = ajax_wrapper
  