<template>
  <el-progress v-show="isShowProgress" type="circle" :percentage="percentage" :width="178" />
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
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { ref, watchEffect } from 'vue'
import { UploadProgressEvent, UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus/lib/components/index.js'

const isShowProgress = ref(false)
const percentage = ref(0)
const imageUrl = ref('')
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const emits = defineEmits(['update:modelValue'])
watchEffect(() => {
  imageUrl.value = props.modelValue
})
const handleAvatarSuccess: UploadProps['onSuccess'] = (response: any, uploadFile: any) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  emits('update:modelValue', response.data.name)
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
