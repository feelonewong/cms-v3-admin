<template>
  <div>
    <el-page-header @back="goBack">
      <template #content>
        <span class="text-large font-600 mr-3">{{ route.query.courseName }}</span>
      </template>
      <template #extra>
        <el-button type="primary" :icon="Plus"> 添加章节</el-button>
      </template>
    </el-page-header>
    <el-card class="box-card">
      <el-tree :data="courseAndSection" :props="defaultProps" @node-click="handleNodeClick" />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getSectionAndLesson, getCourseDet } from '@/api/course'
import { ElMessage } from 'element-plus/lib/components/index.js'
import { Plus } from '@element-plus/icons-vue'
const route = useRoute()
const router = useRouter()
const props = defineProps({
  courseId: String
})
interface Tree {
  label: string
  children?: Tree[]
}

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
const defaultProps = {
  children: 'lessonDTOS',
  label: (data: string | any) => data.sectionName || data.theme
}
const courseAndSection = ref<Tree[]>([])
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

const handleNodeClick = (data: Tree) => {
  console.log(data)
}
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 20px;
  padding-right: 10px;
  margin-right: 20px;
}

:deep(.el-tree-node__content) {
  padding: 15px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  font-size: 18px;
}
</style>
