<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      :title="`${msgText}章节`"
      width="50%"
      :close-on-click-modal="false"
    >
      <el-form :model="form" ref="sectionInfoForm" label-position="top">
        <el-form-item label="课程章节" :label-width="formLabelWidth" prop="courseName">
          <el-input v-model="form.sectionName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="章节名称" :label-width="formLabelWidth" prop="sectionName">
          <el-input v-model="form.courseName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="章节描述" :label-width="formLabelWidth" prop="description">
          <el-input type="textarea" v-model="form.description" autocomplete="off" />
        </el-form-item>
        <el-form-item label="章节排序" :label-width="formLabelWidth" prop="orderNum">
          <el-input type="number" v-model="form.orderNum" autocomplete="off" />
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
import { FormInstance } from 'element-plus/lib/components'
import { getSectionInfo, saveOrUpdateSection } from '@/api/course'
import { ElMessage } from 'element-plus/lib/components/index.js'
const dialogVisible = ref(false)
const msgText = ref('')
const form = reactive({
  id: undefined,
  courseId: '',
  courseName: '',
  sectionName: '',
  description: '',
  orderNum: '',
  status: 0
})
const formLabelWidth = '140px'
const props = defineProps({
  roleInfo: Object
})
const sectionInfoForm = ref<FormInstance>()
const emit = defineEmits(['updateSuccess'])
const initShow = (id: number, sectionForm: any) => {
  if (!id) {
    nextTick(() => {
      sectionInfoForm.value?.resetFields()
    })
    // 新建
    msgText.value = '添加'
  } else {
    // 编辑
    msgText.value = '更新'
    for (const prop in form) {
      form[prop] = sectionForm[prop]
    }
  }
  dialogVisible.value = true
}
const handleSubmit = () => {
  saveOrUpdateSection(form)
    .then((res) => {
      console.log(res)
      if (res.data.code === '000000') {
        ElMessage.success('操作成功')

        emit('updateSuccess', true)
        dialogVisible.value = false
      } else {
        ElMessage.error('操作失败')
      }
    })
    .catch((err) => {
      // emit('updateSuccess', false)
    })
}
defineExpose({ initShow })
</script>

<style lang="less" scoped></style>
