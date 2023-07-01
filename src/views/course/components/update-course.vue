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
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { Edit, Picture, UploadFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const props = defineProps({
  courseId: Number
})
const router = useRouter()
const currentStep = ref(0)
const goBack = () => {
  router.go(-1)
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
</style>
