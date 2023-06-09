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

export const deleteRole = (id: number) => {
  return request({
    url: `/boss/role/${id}`,
    method: 'DELETE'
  })
}

export type RoleMenuItem = {
  createdBy: string
  createdTime: string
  description: string
  id: number
  href: string
  icon: string
  level: number
  name: string
  operatorId: number
  orderNum: number
  parentId: number
  selected: boolean
  shown: boolean
  subMenus: Array<RoleMenuItem> | null
  updatedBy: string
}

type Common<T> = {
  code: string
  data: T
  mesg: string
  time: string
}
export const allocRoleList = (id: string) => {
  return request<Common<RoleMenuItem[]>>({
    url: `/boss/menu/getRoleMenus`,
    method: 'GET',
    params: { roleId: id }
  })
}

export const updateTreeList = (id: string, menuIdList: number[]) => {
  return request({
    url: `/boss/menu/allocateRoleMenus`,
    method: 'POST',
    data: {
      roleId: id,
      menuIdList: menuIdList
    }
  })
}
type RoleCategoryItem = {
  createBy: string
  createdTime: string
  id: number
  name: string
  operatorId: number | null
  resourceList: null | any
  selected: boolean
  sort: number
  updatedBy: string
  updatedTime: string
}
export const getRoleResources = (id: string) => {
  return request<Common<RoleCategoryItem[]>>({
    url: `/boss/resource/getRoleResources`,
    method: 'GET',
    params: { roleId: id }
  })
}

export const allocRoleResources = (id: number | string, resourceIdList: []) => {
  return request({
    url: `/boss/resource/allocateRoleResources`,
    method: 'POST',
    data: {
      roleId: id,
      resourceIdList: resourceIdList
    }
  })
}
