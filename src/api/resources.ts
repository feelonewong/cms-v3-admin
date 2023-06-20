import request from '@/utils/request'

export type Condition = Partial<{
  id: number
  name: string
  startCreateTime: string
  url: string
  categoryId: number | string
  endCreateTime: string
  current: number
  size: number
  total: number
}>
// 列表
export const getResourceList = (condition: Condition) => {
  return request({
    url: '/boss/resource/getResourcePages',
    method: 'POST',
    data: condition
  })
}
