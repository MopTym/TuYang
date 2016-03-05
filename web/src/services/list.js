/**
 * 列表服务
 */

import AV from 'avoscloud-sdk'

/**
 * 获取最新列表
 * @return {Promise}
 */
function getLastList () {
  let cql = 'select * from Post limit 42 order by -date'
  return AV.Query.doCloudQuery(cql).then((res) => res.results)
}

export default { getLastList }
