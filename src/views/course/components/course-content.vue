<template>
  <div>
    <el-page-header @back="goBack" style="padding-right: 20px">
      <template #content>
        <span class="text-large font-600 mr-3">{{ route.query.courseName }}</span>
      </template>
      <template #extra>
        <el-button type="primary" :icon="Plus" @click="handleAddSection"> 添加章节</el-button>
      </template>
    </el-page-header>
    <el-card class="box-card">
      <el-tree :data="courseAndSection" :props="defaultProps" @node-click="handleNodeClick">
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span class="custom-tree-node-btns" v-show="node.level === 1">
              <el-button type="info" :icon="Edit" @click.stop="handleSectionEdit($event, data)"
                >编辑</el-button
              >
              <el-button type="primary" :icon="Plus" @click="handleAddLesson($event, data)"
                >添加课时</el-button
              >
              <el-button type="info" :icon="Refresh" @click.stop="handleRefersh($event, data)">{{
                sectionStatusText[data.status]
              }}</el-button>
            </span>
            <span class="custom-tree-node-btns" v-show="node.level === 2">
              <el-button type="info" :icon="Edit" @click="handleEditLesson($event, data)"
                >编辑</el-button
              >
              <el-button type="success" :icon="UploadFilled">上传视频</el-button>
              <el-button type="info" :icon="CirclePlusFilled">{{
                lessonStatusText[data.status]
              }}</el-button>
            </span>
          </span>
        </template>
      </el-tree>
    </el-card>

    <update-section ref="updateSectionRef" @updateSuccess="handleUpdateSuccess"></update-section>
    <status-change ref="statusChangeRef" @updateSuccess="handleUpdateSuccess"></status-change>
    <lesson-update ref="lessonUpdateRef"></lesson-update>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getSectionAndLesson, getCourseDet } from '@/api/course'
import { ElMessage } from 'element-plus/lib/components/index.js'
import { Plus, Edit, UploadFilled, Refresh, CirclePlusFilled } from '@element-plus/icons-vue'
import UpdateSection from '@/views/course/components/update-section.vue'
import StatusChange from '@/views/course/components/statusChange.vue'
import LessonUpdate from '@/views/course/components/lesson-update.vue'
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
const sectionStatusText = ['隐藏', '待更新', '已发布']
const lessonStatusText = ['隐藏', '未发布', '已发布']
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
    } else {
      ElMessage.error('获取课程详情失败' + result.mesg)
      new Error('获取课程详情失败' + result.mesg)
    }
  })
}

const handleNodeClick = (data: Tree) => {
  // console.log(data)
}
const updateSectionRef = ref<InstanceType<typeof UpdateSection>>()
const statusChangeRef = ref<InstanceType<typeof StatusChange>>()
const lessonUpdateRef = ref<InstanceType<typeof LessonUpdate>>()
const handleAddLesson = (row: any, data: any) => {
  lessonUpdateRef.value?.initDialog(0, {})
}
const handleEditLesson = (row: any, data: any) => {
  lessonUpdateRef.value?.initDialog(data.id, data)
}
const handleAddSection = () => {
  updateSectionRef.value?.initShow(0, {})
}
const handleRefersh = (row: any, data: any) => {
  statusChangeRef.value?.initDialog(data.id, data)
}
const handleSectionEdit = (row: any, data: any) => {
  updateSectionRef.value?.initShow(data.id, data)
}
const handleUpdateSuccess = (flag: boolean) => {
  if (flag) {
    getSectionAndLessonList()
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 20px;
  padding-right: 10px;
  margin-right: 20px;
}

:deep(.el-tree-node__content) {
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  font-size: 18px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
