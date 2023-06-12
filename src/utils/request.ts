import axios, { type AxiosRequestHeaders } from 'axios'
import { useTokenStore } from '@/stores/token'
import { refreshToken } from '@/api/user'
import ElMessage from 'element-plus/lib/components/message/index.js'
import router from '@/router/index'
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string
})

request.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = {} as AxiosRequestHeaders
  }
  const store = useTokenStore()
  config.headers.Authorization = store.token.access_token
  return config
})

request.interceptors.response.use(
  (res: any) => {
    return res
  },
  async (error: any) => {
    if (error.response.status === 401) {
      const { data } = await refreshToken()
      if (data.success) {
        // 保存新token
        useTokenStore().saveToken(data.content)
        // 重新发送请求
        return request(error.config)
      } else {
        // 跳转到登录页
        ElMessage.error('登录已过期，请重新登录')
        router.push({ name: 'login' })
        return
      }
    }
    return Promise.reject(error)
  }
)
export default request
