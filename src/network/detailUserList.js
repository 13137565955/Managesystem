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
import Axios from "axios";
export function putdetailState(users, state) {
  Axios.put('users/' + users + '/state/' + state);
}