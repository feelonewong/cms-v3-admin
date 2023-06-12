import axios, { type AxiosRequestHeaders } from 'axios'
import { useTokenStore } from '@/stores/token'
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
export default request
