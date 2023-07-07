import request from '@/utils/request'

// 获取视频上传凭证
export function getVideoUploadAuth(fileName: string, imgUrl: string) {
  request({
    url: '/boss/course/upload/aliyunVideoUploadAddressAdnAuth.json',
    method: 'get',
    params: {
      fileName,
      imgUrl
    }
  })
}

// 获取图片上传凭证
export function getImgUploadAuth() {
  request({
    url: '/boss/course/upload/aliyunImagUploadAddressAdnAuth.json',
    method: 'get'
  })
}

// 刷新视频上传凭证
export function refreshVideoUploadAuth(videoId: string) {
  request({
    url: '/boss/course/upload/refreshAliyunVideoUploadAddressAdnAuth.json',
    method: 'get',
    params: {
      videoId
    }
  })
}

// 阿里云转码请求
export function aliyunTransCode(data: any) {
  request({
    url: '/boss/course/upload/aliyunTransCode.json',
    method: 'post',
    data
  })
}

// 5.阿里云转码进度
export function aliyunTransCodePercent(lessonId: string) {
  request({
    url: '/boss/course/upload/aliyunTransCodePercent.json',
    method: 'get',
    params: {
      lessonId
    }
  })
}

// 6.获取媒体信息
export function getAliyunMediaInfo(lessonId: string) {
  request({
    url: '/boss/course/upload/getAliyunMediaByLessonId.json',
    method: 'get',
    params: {
      lessonId
    }
  })
}
