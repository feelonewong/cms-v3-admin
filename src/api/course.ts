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

export const updateCourse = (course: object) => {
  return request({
    url: '/boss/course/saveOrUpdateCourse',
    method: 'POST',
    data: course
  })
}

export const getCourseDet = (courseId: number | string) => {
  return request({
    url: '/boss/course/getCourseById',
    method: 'GET',
    params: {
      courseId
    }
  })
}
