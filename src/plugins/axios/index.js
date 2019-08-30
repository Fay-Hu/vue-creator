import axios from 'axios'
import Toast from 'muse-ui-toast'
// 进度条
import NProgress from 'nprogress'
import { getAuthToken, setAuthToken } from '@/utils'
import { VERSION_CODE } from '@/constants'

// 创建一个错误
function errorCreate (msg) {
  const err = new Error(msg)
  errorLog(err)
  throw err
}

// 记录和显示错误
function errorLog (err) {
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    console.log(err)
  }

  if (String(err.message).search('timeout') !== -1) {
    err.message = '请求数据超时'
  }

  if (String(err.message).search('Network Error') !== -1) {
    err.message = '网络错误'
  }

  // 显示错误提示
  Toast.message(err.message)
}

// 创建一个 axios 实例
const service = axios.create({
  // 此处为了便于在后端部署后修改api地址，使用了window对象
  baseURL: window.appConfig.baseAPI,
  headers: {
    'versionCode': VERSION_CODE
  },
  timeout: 10000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // config.headers['token'] = getAuthToken()

    NProgress.start()
    return config
  },
  error => {
    // 发送失败
    console.log('request ->', error)
    NProgress.done()
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    NProgress.done()
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data

    // 这个状态码是和后端约定的
    const { code } = dataAxios
    // 根据 code 进行判断
    if (code === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口
      return dataAxios
    } else {
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (code) {
        case 1:
          // [ 示例 ] code === 0 代表没有错误
          return dataAxios.data
        default:
          // 不是正确的 code
          errorCreate(`${dataAxios.msg}`)
          break
      }
    }
  },
  error => {
    NProgress.done()
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未登录或者登录过期，请重新登录'; break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错`; break
        case 408: error.message = '请求超时'; break
        case 422: error.message = '验证失败'; break
        case 500: error.message = '服务器错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

export default service
