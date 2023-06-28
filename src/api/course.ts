import request from '@/utils/request'

export type QueryCondition = {
  currentPage: number
  pageSize: number
  courseName?: string
  status?: string | number
}
export const getQueryCourses = (queryCondition: QueryCondition) => {
  return request({
    url: '/boss/course/getQueryCourses',
    method: 'POST',
    data: queryCondition
  })
}
