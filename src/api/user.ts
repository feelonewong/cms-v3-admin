import request from '@/utils/request'

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
