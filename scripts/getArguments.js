function getArguments() {
  const [dir, filename] = process.argv.slice(2)
  /* 缺少参数时抛出错误 */
  if (!dir || !filename) {
    throw new Error(
      `请输入正确的命令
  hint: yarn test <directory_name> <file_name>
  `)
  }
  return [dir, filename]
}

module.exports = getArguments