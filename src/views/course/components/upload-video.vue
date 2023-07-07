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
import { reactive, ref, nextTick, onMounted } from 'vue'
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

onMounted(() => {
  console.log(initUpload())
})
const initUpload = () => {
  return new AliyunUpload.Vod({
    //userID，必填，您可以使用阿里云账号访问账号中心（https://account.console.aliyun.com/），即可查看账号ID
    userId: '122',
    //上传到视频点播的地域，默认值为'cn-shanghai'，
    //eu-central-1，ap-southeast-1
    region: '',
    //分片大小默认1 MB，不能小于100 KB（100*1024）
    partSize: 1048576,
    //并行上传分片个数，默认5
    parallel: 5,
    //网络原因失败时，重新上传次数，默认为3
    retryCount: 3,
    //网络原因失败时，重新上传间隔时间，默认为2秒
    retryDuration: 2,
    //开始上传
    onUploadstarted: function (uploadInfo) {},
    //文件上传成功
    onUploadSucceed: function (uploadInfo) {},
    //文件上传失败
    onUploadFailed: function (uploadInfo, code, message) {},
    //文件上传进度，单位：字节
    onUploadProgress: function (uploadInfo, totalSize, loadedPercent) {},
    //上传凭证或STS token超时
    onUploadTokenExpired: function (uploadInfo) {},
    //全部文件上传结束
    onUploadEnd: function (uploadInfo) {}
  })
}
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
