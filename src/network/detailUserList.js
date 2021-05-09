import {
  request
} from './request'
export function getdetailUserList(query, pagenum, pagesize) {
  return request({
    url: '/users',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}
//该表用户状态请求
export function putdetailState(uId, state) {
  return request({
    // 记得要加方法是put方法  看清接口拼接方式
    method: 'put',
    url: '/users/' + uId + '/state/' + state,
  })
}