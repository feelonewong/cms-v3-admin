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
            <ImgUpload v-model="course.courseListImg"></ImgUpload>
          </el-form-item>
          <el-form-item label="解锁图片 ">
            <ImgUpload v-model="course.courseImgUrl"></ImgUpload>
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
          <el-button type="primary" v-show="currentStep === 4" @click="handleSubmit"
            >保存</el-button
          >
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { Edit, Picture, UploadFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import ImgUpload from '@/views/course/components/ImgUpload.vue'

const props = defineProps({
  courseId: Number
})
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
const handleSubmit = () => {
  console.log(course)
}
</script>

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
