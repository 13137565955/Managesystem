import {
  request
} from './request'
export function getshopList(query, pagenum, pagesize) {
  return request({
    method: 'get',
    url: '/goods',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}