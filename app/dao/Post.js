const AV = require('leanengine')
const Post = AV.Object.extend('Post', {

  // 实例方法

}, {

  // 类方法

  /**
   * 保存一个对象
   */
  async saveFrom (tar) {
    return new Post().save(tar)
  },

  /**
   * 获取表中的最新时间
   */
  async getLastDate () {
    let cql = 'select date from Post limit 1 order by -date'
    let res = (await AV.Query.doCloudQuery(cql)).results
    if (res[0]) {
      return res[0].get('date')
    } else {
      return new Date(0)
    }
  },

  /**
   * 获取最新的列表
   */
  async getLastList () {
    let cql = 'select * from Post limit 42 order by -date'
    let res = (await AV.Query.doCloudQuery(cql)).results
    return res
  }
})

module.exports = Post
