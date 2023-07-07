<template>
  <div>
    <el-dialog v-model="dialogVisible" title="上传视频" width="50%" :close-on-click-modal="false">
      <div class="dialog-content">
        <el-upload class="upload-demo" action="#" accept="video/*">
          <el-button size="medium" type="primary" plain>上传视频</el-button>
          <template #tip>
            <div class="el-upload__tip">{{ uploadVideoTips }}</div>
          </template>
        </el-upload>
        <el-upload class="upload-demo" action="#" accept="video/*">
          <el-button size="medium" type="primary" plain>上传封面</el-button>
          <template #tip>
            <div class="el-upload__tip">{{ uploadImageTips }}</div>
          </template>
        </el-upload>
        <div class="start-upload">
          <el-button type="primary">开始上传</el-button>
          <h4>视频上传进度: {{ uploadPercent }}</h4>
          <h4>视频转码进度: {{ uploadChangePercent }}</h4>
        </div>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, nextTick } from 'vue'
import type { FormInstance } from 'element-plus/lib/components/index.js'
import { ElMessage } from 'element-plus/lib/components/index.js'
import { saveOrUpdateSection } from '@/api/course'
const dialogVisible = ref(false)

const props = defineProps({
  roleInfo: Object
})
const uploadVideoTips = ref('只能上传mp4文件')
const uploadImageTips = ref('只能上传JPEG/PNG文')
const uploadPercent = ref(0)
const uploadChangePercent = ref(0)
let lessonId = ref(0)
const initDialog = (node, data) => {
  console.log(data)
  dialogVisible.value = true
}
const handleSubmit = () => {}
defineExpose({
  initDialog
})
</script>

<style lang="scss" scoped>
.upload-demo {
  margin-bottom: 30px;
}
.start-upload {
  margin-top: 30px;
}
.dialog-content {
  padding-left: 10px;
}
</style>
