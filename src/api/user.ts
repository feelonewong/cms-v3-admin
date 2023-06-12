import request from '@/utils/request'
import { useTokenStore } from '@/stores/token'

type LoginInfo = {
  phone: string
  code?: string
  password: string
}

type CommonReturn<T> = {
  success: string
  state: number
  message: string
  content: T
}
type LoginResult = CommonReturn<string>
type UserInfo = CommonReturn<{
  isUpdatedPassword: boolean
  portrait: string
  userName: string
}>

// 登录接口
export const login = (loginInfo: LoginInfo) => {
  return request<LoginResult>({
    url: '/front/user/login',
    method: 'POST',
    data: `phone=${loginInfo.phone}&password=${loginInfo.password}`
  })
}

// 登录接口
export const getInfo = () => {
  return request<UserInfo>({
    url: '/front/user/getInfo',
    method: 'GET'
  })
}

// 退出接口
export const logout = () => {
  return request({
    url: '/front/user/logout',
    method: 'POST'
  })
}

// 刷新token接口
let promiseRT: Promise<any>
let refreshing = false
export const refreshToken = () => {
  if (refreshing) return promiseRT
  refreshing = true
  promiseRT = request({
    method: 'POST',
    url: '/front/user/refresh_token',
    params: {
      refreshtoken: useTokenStore().token.refresh_token
    }
  }).finally(() => {
    refreshing = false
  })
  return promiseRT
}
