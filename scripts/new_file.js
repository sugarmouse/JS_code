
//  yarn new <group_name> <file_name> 

const fs = require('fs')
const path = require('path')
const getArguments = require('./getArguments.js')

const [dir, filename] = getArguments()
newFile(dir, filename)


// 创建对应 src.js 文件和 test.js 文件
function newFile(dir, filename) {
  const src_file_path = path.resolve(__dirname, `../src/${dir}/${filename}.js`)
  const default_content = `
function ${filename} () {
  // src code
}

module.exports = ${filename}
  `
  fs.writeFile(src_file_path, default_content, { flag: 'a+' }, (err) => {
    if (err) console.log(err)
  })


  const test_file_path = path.resolve(__dirname, `../test/${dir}/${filename}.test.js`)
  const default_test_content =
`
const  ${filename} = require ('../../src/${dir}/${filename}.js')
describe('${filename} test',()=>{
  test("pass", () => {
    // test code
  })
})
`

  fs.writeFile(test_file_path, default_test_content, { flag: 'a+' }, (err) => {
    if (err) console.log(err)
  })
}
