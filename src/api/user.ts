import request from '@/utils/request'
import { useTokenStore } from '@/stores/token'
// const store = useTokenStore()
type LoginInfo = {
  phone: string
  code?: string
  password: string
}

type LoginResult = {
  success: boolean
  state: number
  message: string
  content: string
}
// 登录接口
export const login = (loginInfo: LoginInfo) => {
  return request<LoginResult>({
    url: '/front/user/login',
    method: 'POST',
    data: `phone=${loginInfo.phone}&password=${loginInfo.password}`
  })
}

type UserInfo = {
  success: string
  state: number
  message: string
  content: {
    isUpdatedPassword: boolean
    portrait: string
    userName: string
  }
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
export const refreshToken = () => {
  return request({
    method: 'POST',
    url: '/front/user/refresh_token',
    params: {
      refreshtoken: useTokenStore().token.refresh_token
    }
  })
}
