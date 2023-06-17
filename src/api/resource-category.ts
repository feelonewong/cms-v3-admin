import request from '@/utils/request'

type CommonReturn<T> = {
  code: string
  data: T
  mesg: string
  time: string
}

export type ResourceCategoryItem = {
  createdBy: string
  createdTime: string
  id: number
  name: string
  operatorId: number | null
  selected: false
  sort: number
  updatedBy: string
  updatedTime: string
}

// 获取资源列表接口
export const getAllResource = () => {
  return request<CommonReturn<ResourceCategoryItem[]>>({
    url: '/boss/resource/category/getAll',
    method: 'GET'
  })
}

type ResourceCategoryInfo = {
  name: string
  sort: number
  id?: number
}

// 保存或者更新资源类别
export const saveOrUpdateResource = (data: ResourceCategoryInfo) => {
  return request({
    url: '/boss/resource/category/saveOrderUpdate',
    method: 'POST',
    data: data
  })
}

// 删除
export const deleteResourceCategory = (id: number | string) => {
  return request({
    url: `/boss/resource/category/${id}`,
    method: 'DELETE',
  })
}
