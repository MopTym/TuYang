const Post = require('../dao/Post')

/**
 * 获取最新列表
 */
async function getLastList () {
  let list = await Post.getLastList()
  return list
}

module.exports = { getLastList }
