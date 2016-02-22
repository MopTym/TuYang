/**
 * 列表服务
 */

import AV from 'avoscloud-sdk'

/**
 * 获取最新列表
 * @return {Promise}
 */
function getLastList () {
  return AV.Cloud.run('getLastList')
}

export default { getLastList }
