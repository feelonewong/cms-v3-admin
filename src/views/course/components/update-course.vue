<template>
  <div>
    <el-page-header @back="goBack">
      <template #content>
        <span class="text-large font-600 mr-3"> {{ props.courseId ? '编辑' : '新增' }}课程 </span>
      </template>
      <template #extra>
        <el-button type="primary">保存</el-button>
      </template>
    </el-page-header>
    <el-card class="box-card">
      <template #header>
        <el-steps :space="200" :active="currentStep" simple>
          <el-step title="基本信息" :icon="Edit" @click="currentStep = 0" />
          <el-step title="课程封面" :icon="UploadFilled" @click="currentStep = 1" />
          <el-step title="销售信息" :icon="Picture" @click="currentStep = 2" />
          <el-step title="秒杀活动" :icon="Picture" @click="currentStep = 3" />
          <el-step title="课程详情" :icon="Picture" @click="currentStep = 4" />
        </el-steps>
      </template>
      <el-form :model="course" label-width="120px" size="large">
        <div v-show="currentStep === 0">
          <el-form-item label="课程名称" prop="courseName">
            <el-input v-model="course.courseName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="课程简介" prop="brief">
            <el-input v-model="course.brief" autocomplete="off" />
          </el-form-item>
          <el-form-item label="讲师姓名" prop="teacherName">
            <el-input v-model="course.teacherDTO.teacherName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="讲师职位" prop="position">
            <el-input v-model="course.teacherDTO.position" autocomplete="off" />
          </el-form-item>
          <el-form-item label="讲师简介" prop="description">
            <el-input v-model="course.teacherDTO.description" autocomplete="off" />
          </el-form-item>
          <el-form-item label="课程概述1" prop="previewFirstField">
            <el-input v-model="course.previewFirstField" autocomplete="off" />
          </el-form-item>
          <el-form-item label="课程概述2" prop="previewSecondField">
            <el-input v-model="course.previewSecondField" autocomplete="off" />
          </el-form-item>
          <el-form-item label="课程排序" prop="sortNum">
            <el-input v-model.number="course.sortNum" autocomplete="off" />
          </el-form-item>
        </div>
        <div v-show="currentStep === 1">
          <el-form-item label="展示图片 ">
            <el-progress
              v-show="isShowProgress"
              type="circle"
              :percentage="percentage"
              :width="178"
            />
            <el-upload
              v-show="!isShowProgress"
              class="avatar-uploader"
              action="http://39.97.218.60/boss/course/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-progress="handleProgress"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" @load="isShowProgress = false" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="展示图片 ">
            <el-upload
              class="avatar-uploader"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </div>
        <div v-show="currentStep === 2">
          <h1>销售信息</h1>
        </div>
        <div v-show="currentStep === 3">
          <h1>秒杀活动</h1>
        </div>
        <div v-show="currentStep === 4">
          <h1>课程详情</h1>
        </div>
        <div class="form-bottom-btn">
          <el-button type="primary" v-show="currentStep != 0" @click="currentStep--"
            >上一步</el-button
          >
          <el-button type="primary" v-show="currentStep != 4" @click="currentStep++"
            >下一步</el-button
          >
          <el-button type="primary" v-show="currentStep === 4">保存</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { Edit, Picture, UploadFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProgressEvent, UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus/lib/components/index.js'

const props = defineProps({
  courseId: Number
})
// 进度条的数值
const percentage = ref(0)
// 是否显示进度条
const isShowProgress = ref(false)
const router = useRouter()
const currentStep = ref(0)
const course = reactive({
  // 基本信息
  courseName: '',
  brief: '',
  teacherDTO: {
    teacherName: '',
    position: '',
    description: ''
  },
  previewFirstField: '',
  previewSecondField: '',
  sortNum: 0,
  courseListImg: '',
  courseImgUrl: ''
})
const goBack = () => {
  router.go(-1)
}

const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (response: any, uploadFile: any) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  course.courseImgUrl = response.data.name
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile: any) => {
  //
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  isShowProgress.value = true
  return true
}
const handleProgress = (evt: UploadProgressEvent) => {
  percentage.value = Math.round((evt.loaded / evt.total) * 100)
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: auto;
  margin-top: 10px;
}
.el-step {
  cursor: pointer;
}
.form-bottom-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.el-form {
  padding: 0 180px;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
