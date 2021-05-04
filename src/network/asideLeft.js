import {
  request
} from './request'
export function getasideLeft() {
  return request({
    url: '/menus',
  })
}