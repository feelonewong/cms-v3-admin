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

export type QueryCondition = {
  currentPage: number
  pageSize: number
  phone?: string
  userId?: number
  startCreateTime?: string
  endCreateTime?: string
  time?: string[]
}
// 获取用户列表信息
export const getUserList = (queryCondition: QueryCondition) => {
  return request({
    url: '/boss/user/getUserPages',
    method: 'POST',
    data: queryCondition
  })
}

// 根据id获取角色列表
export const getRoleByUserId = (userId: string | number) => {
  return request({
    url: '/boss/role/getRolesWithUserPermission',
    method: 'GET',
    params: {
      userId: userId
    }
  })
}

export const allocRoleSave = (userId: string | number, roleIdList: number | string[]) => {
  return request({
    url: '/boss/role/allocateUserRoles',
    method: 'POST',
    data: {
      userId: userId,
      roleIdList: roleIdList
    }
  })
}
