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
  name: string
}
// 获取菜单列表
export const getAllMenus = () => {
  return request<CommonReturn<MenuItem[]>>({
    url: '/boss/menu/getAll',
    method: 'GET'
  })
}

type MenuInfo = Pick<MenuItem, 'id' | 'parentId' | 'href' | 'icon' | 'description' | 'shown'> & {
  id?: number
  name: string
  orderNum: number
}

// 更新菜单
export const updatedMenus = (menuInfo: Object) => {
  return request({
    url: '/boss/menu/saveOrUpdate',
    method: 'POST',
    data: menuInfo
  })
}

// 删除菜单
export const deleteMenus = (id: string | number) => {
  return request({
    url: `/boss/menu/${id}`,
    method: 'DELETE',
  })
}
