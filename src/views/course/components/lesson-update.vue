<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      :title="`${msgText}`"
      width="50%"
      :close-on-click-modal="false"
    >
      <el-form :model="form" ref="lessonUpdateForm" label-position="top">
        <el-form-item label="课程名称" prop="lessonName">
          <el-input v-model="form.courseName" disabled></el-input>
        </el-form-item>
        <el-form-item label="章节名称" prop="lessonName">
          <el-input v-model="form.sectionName" disabled></el-input>
        </el-form-item>
        <el-form-item label="课时名称" prop="lessonName">
          <el-input v-model="form.theme"></el-input>
        </el-form-item>
        <el-form-item label="时长" prop="lessonName">
          <el-input v-model="form.duration"></el-input>
        </el-form-item>
        <el-form-item label="是否开放试听" prop="lessonName">
          <el-switch v-model="form.isFree"></el-switch>
        </el-form-item>
        <el-form-item label="课时排序" prop="lessonName">
          <el-input v-model="form.orderNum"></el-input>
        </el-form-item>
      </el-form>
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
const msgText = ref('更新章节状态')
const form = reactive({
  id: undefined as undefined | number,
  courseId: '',
  courseName: '',
  sectionId: '',
  sectionName: '',
  theme: '',
  duration: '',
  isFree: false,
  orderNum: ''
})
const formLabelWidth = '140px'
const props = defineProps({
  roleInfo: Object
})
const currnetStatus = ref('')
const lessonUpdateForm = ref<FormInstance>()
const emit = defineEmits(['updateSuccess'])

const sectionStatusText = ['隐藏', '待更新', '已发布']
const initDialog = (node: any, id: number, data: any) => {
  if (!id) {
    msgText.value = '新增课程'
    form.id = undefined
    form.sectionId = data.id
    form.sectionName = data.sectionName
  } else {
    console.log(node)
    msgText.value = '更新课程'
    form.id = data.id
    form.sectionId = node.parent.data.id
    form.sectionName = node.parent.data.sectionName
    form.theme = data.theme
    form.duration = data.duration
    form.isFree = data.isFree
    form.orderNum = data.orderNum
  }
  form.courseId = data.id
  form.courseName = data.courseName
  dialogVisible.value = true
}
const handleSubmit = () => {
  saveOrUpdateSection(form).then((res) => {
    if (res.data.code === '000000') {
      ElMessage.success('更新成功')
      emit('updateSuccess', true)
      dialogVisible.value = false
    }
  })
}
defineExpose({
  initDialog
})
</script>

<style lang="scss" scoped></style>
