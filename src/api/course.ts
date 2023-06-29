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

// 课程上下架
export const changeState = (courseId: number, status: number) => {
  return request({
    url: '/boss/course/changeState',
    method: 'GET',
    params: {
      courseId,
      status
    }
  })
}
