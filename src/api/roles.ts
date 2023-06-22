import request from '@/utils/request'

type queryCondition = Partial<{
  code: string
  id: number
  name: string
  startCreateTime: string
  endCreateTime: string
  current: number
  size: number
}>

interface RoleCommonReturn<T> {
  code: string
  data: T
  mesg: string
  time: string
}

export const getRolePages = (data: queryCondition) => {
  return request<RoleCommonReturn<Object>>({
    url: '/boss/role/getRolePages',
    method: 'POST',
    data
  })
}

type RoleInfo = {
  code: string
  id?: number
  description: string
  name: string
}
export const saveOrUpdate = (roleInfo: RoleInfo) => {
  return request({
    url: '/boss/role/saveOrUpdate',
    method: 'POST',
    data: roleInfo
  })
}
