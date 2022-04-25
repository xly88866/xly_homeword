// 引入axios
import request from './request.js'

export function Login(data) {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}
export function Homelist(params) {
  return request({
    url: 'menus',
    method: 'get',
    params
  })
}
export function userlist(params) {
  return request({
    url: 'users',
    method: 'GET',
    params
  })
}
export function userDel(data) {
  return request({
    url: 'users/' + data,
    method: 'delete',
    data
  })
}
export function userAdd(data) {
  return request({
    url: 'users',
    method: 'POST',
    data
  })
}
export function userEmit(id,data) {
  return request({
    url: 'users/' + id,
    method: 'PUT',
    data
  })
}
