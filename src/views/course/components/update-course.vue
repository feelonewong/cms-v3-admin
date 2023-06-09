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
          <el-form-item label="售卖价格" prop="discounts">
            <el-input v-model.number="course.discounts" autocomplete="off" />
          </el-form-item>
          <el-form-item label="商品原价" prop="price">
            <el-input v-model.number="course.price" autocomplete="off" />
          </el-form-item>
          <el-form-item label="销量" prop="sales">
            <el-input v-model.number="course.sales" autocomplete="off" />
          </el-form-item>
          <el-form-item label="活动标签" prop="discountsTag">
            <el-input v-model="course.discountsTag" autocomplete="off" />
          </el-form-item>
        </div>
        <div v-show="currentStep === 3">
          <el-form-item label="限时秒杀活动" prop="activityCourse">
            <el-switch v-model="course.activityCourse" @change="handleChangeActivaty" />
          </el-form-item>
          <div v-show="course.activityCourse">
            <el-form-item label="活动时间" prop="discounts">
              <el-date-picker
                v-model="activitiyTime"
                type="daterange"
                range-separator="To"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                value-format="YYYY-MM-DD"
                @change="handleTimeChange"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="活动价格" prop="amount">
              <el-input v-model.number="course.activityCourseDTO.amount" autocomplete="off" />
            </el-form-item>
            <el-form-item label="库存值" prop="stock">
              <el-input v-model.number="course.activityCourseDTO.stock" autocomplete="off" />
            </el-form-item>
          </div>
        </div>
        <div v-show="currentStep === 4">
          <el-form-item label="课程详情" prop="courseDescriptionMarkDown">
            <TextEditor v-model="course.courseDescriptionMarkDown"></TextEditor>
          </el-form-item>
          <el-form-item label="是否上架" prop="status">
            <el-switch v-model="course.status" :active-value="1" :inactive-value="0" />
          </el-form-item>
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
import { onMounted, reactive, ref } from 'vue'
import ImgUpload from '@/views/course/components/ImgUpload.vue'
import TextEditor from '@/components/TextEditor/textEditor.vue'
import ElMessage from 'element-plus/lib/components/message/index.js'
import { updateCourse, getCourseDet } from '@/api/course'
import UpdateSection from '@/views/course/components/update-section.vue'

const props = defineProps({
  courseId: Number
})
const router = useRouter()
const currentStep = ref(0)
const activitiyTime = ref<string[]>([])
const handleTimeChange = (val: any) => {
  if (Array.isArray(val)) {
    course.value.activityCourseDTO.beginTime = val[0] || ''
    course.value.activityCourseDTO.endTime = val[1] || ''
  } else {
    course.value.activityCourseDTO.beginTime = ''
    course.value.activityCourseDTO.endTime = ''
  }
}
let course = ref({
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
  courseImgUrl: '',
  //   销售信息
  discounts: 0,
  price: 0,
  sales: 0,
  discountsTag: '',
  //   秒杀活动
  activityCourse: false,
  activityCourseDTO: {
    beginTime: '',
    endTime: '',
    amount: 2,
    stock: ''
  },
  courseDescriptionMarkDown: '',
  status: 0
})
onMounted(() => {
  if (props.courseId) {
    // 编辑
    getCourseDet(props.courseId).then((res) => {
      console.log(res)
      const result = res.data
      if (result.code === '000000') {
        course.value = result.data
        course.value.activityCourseDTO.beginTime = result.data.activityCourseDTO.beginTime || ''
        course.value.activityCourseDTO.endTime = result.data.activityCourseDTO.endTime || ''
        activitiyTime.value = [
          course.value.activityCourseDTO.beginTime,
          course.value.activityCourseDTO.endTime
        ]
      }
    })
  } else {
    // 添加
    console.log('添加')
  }
})
const goBack = () => {
  router.go(-1)
}
const handleSubmit = () => {
  console.log(course)
  updateCourse(course)
    .then((res) => {
      const message = props.courseId ? '修改课程' : '添加课程'
      const result = res.data
      if (result.code === '000000') {
        ElMessage.success(`${message}成功`)
        router.push({
          path: '/course'
        })
      } else {
        ElMessage.error(`${message}失败`)
        throw new Error(`${message}失败`)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
const handleChangeActivaty = (val: any) => {
  if (val && course.value.activityCourseDTO === null) {
    course.value.activityCourseDTO = {
      beginTime: '',
      endTime: '',
      amount: 0,
      stock: ''
    }
  }
  if (!val) {
    course.value.activityCourseDTO = {
      beginTime: '',
      endTime: '',
      amount: 0,
      stock: ''
    }
  }
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
