import axios from 'axios'
import qs from 'qs'
import { Toast } from 'antd-mobile' //偷个懒，你也可以自己写个轻提示

import hhf from './hhf'
// 拦截请求
axios.interceptors.request.use(function (config) {
  switch (config.type) {
    case 1:
      Toast.loading('加载中', 0)
      return config
    case 2:
      Toast.loading('正在提交', 0)
      return config
    default:
      return config
  }
})

// 拦截响应
axios.interceptors.response.use(function (res) {
  Toast.hide()
  let message = ''
  if (res) {
  switch (res.status) {
    case 200:
    return res.data
    case 400:
      message = '请求错误'
      break
    case 401:
      message = '未授权，请登录'
      break
    case 403:
      message = '拒绝访问'
      break
    case 404:
      message = `请求地址出错: ${res.config.url}`
      break
    case 408:
      message = '请求超时'
      break
    case 500:
      message = '服务器内部错误'
      break
    case 501:
      message = '服务未实现'
      break
    case 502:
      message = '网关错误'
      break
    case 503:
      message = '服务不可用'
      break
    case 504:
      message = '网关超时'
      break
    case 505:
      message = 'HTTP版本不受支持'
      break
    default:
      break
  }
  Toast.fail(message || `${res.status}问题`, 1);
  return undefined
}
return undefined
})
const resIF = {
  baseURL: 'http://localhost:9093',
  pathNAME: '/user/',
  ...hhf // 防止项目冲突每个接口模块分开
}
const $http = {
  post (baseURL, url, data, type = 0) {
    return axios({
      method: 'post',
      baseURL,
      url,
      type,
      data: qs.stringify(data),
      withCredentials: true,
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).catch(err => {
      Toast.offline('网络连接失败！', 1)
    })
  },
  get (baseURL, url, params, type = 0) {
    return axios({
      method: 'get',
      baseURL,
      url,
      withCredentials: true,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).catch(err => {
      Toast.offline('网络连接失败！', 1)
    })
  }
}
export { resIF, $http }