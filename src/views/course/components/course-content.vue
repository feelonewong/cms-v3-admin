<template>
  <div>
    <el-page-header @back="goBack">
      <template #content>
        <span class="text-large font-600 mr-3">{{ route.query.courseName }}</span>
      </template>
      <template #extra>
        <el-button type="primary">保存</el-button>
      </template>
    </el-page-header>
    <el-card class="box-card"> </el-card>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getSectionAndLesson, getCourseDet } from '@/api/course'
import { ElMessage } from 'element-plus/lib/components/index.js'

const route = useRoute()
const router = useRouter()
const props = defineProps({
  courseId: String
})
onMounted(() => {
  // 获取课程详情
  getSectionAndLessonList()
  getCourse()
})
const goBack = () => {
  router.go(-1)
}
// 课程基本信息
const course = ref({})
//章节课时信息
const courseAndSection = ref({})
const getCourse = () => {
  getCourseDet({ courseId: props.courseId }).then((res) => {
    const result = res.data
    if (result.code === '000000') {
      course.value = result.data
      console.log(course.value)
    } else {
      ElMessage.error('获取课程详情失败' + result.mesg)
      new Error('获取课程详情失败' + result.mesg)
    }
  })
}
const getSectionAndLessonList = () => {
  getSectionAndLesson({ courseId: props.courseId }).then((res) => {
    const result = res.data
    if (result.code === '000000') {
      courseAndSection.value = result.data
      console.log(courseAndSection.value)
    } else {
      ElMessage.error('获取课程详情失败' + result.mesg)
      new Error('获取课程详情失败' + result.mesg)
    }
  })
}
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 20px;
}
</style>
