import request from '@/utils/request'

// 返回值类型
type CommonReturn<T> = {
  code: string
  data: T
  mesg: string
  time: string
}

export type MenuItem = {
  createdBy: string
  createdTime: string
  description: string
  href: string
  icon: string
  id: number
  level: number
  menuName: string
  operatorId: number | null
  parentId: number
  shown: boolean
  updatedBy: string
  updatedTime: string
}
// 获取菜单列表
export const getAllMenus = () => {
  return request<CommonReturn<MenuItem[]>>({
    url: '/boss/menu/getAll',
    method: 'GET'
  })
}
