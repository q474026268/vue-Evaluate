
import request from '@/utils/request'

// 获取当前登录人
export function getNowLoginPerson(data) {
  return request({
    baseURL: process.env.OVERSEA_LOGIN_API,
    url: `/overseesubsys/servlet/Action.cmd?_method=systemService.getUserItems`,
    method: 'GET'
  })
}

// action=getPubkey
// 获取秘钥
export function getSecretKey(data) {
  return request({
    baseURL:process.env.OVERSEA_LOGIN_API,
    url: `/overseesubsys/servlet/LoginServlet.cmd`,
    method: 'POST',
    data:data
  })
}

export function loginAuthentication(data) {
  return request({
    baseURL: process.env.OVERSEA_LOGIN_API,
    url: `/overseesubsys/servlet/LoginServlet.cmd`,
    method: 'POST',
    data: data,
    withCredentials:true,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: [(data) => {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}
/**
 * @description: imcp登录
 * @param {type} 
 * @return: 
 */
export function overseaLogin(X1, X2) {
  return request({
    baseURL: process.env.COMMON_API,
    url: '/login?X1=' + X1 + '&X2='+ X2 + '',
    method: 'post'
  })
}