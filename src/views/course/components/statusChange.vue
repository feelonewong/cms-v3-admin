<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      :title="`${msgText}`"
      width="50%"
      :close-on-click-modal="false"
    >
      <el-result icon="info" :title="`当前状态为: ${currnetStatus}`"> </el-result>
      <el-form :model="form" ref="statusChangeForm" label-position="left">
        <el-form-item label="状态切换:" prop="status">
          <el-select v-model="form.status">
            <el-option
              v-for="(item, index) in sectionStatusText"
              :key="index"
              :label="item"
              :value="index"
            ></el-option>
          </el-select>
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
  id: undefined,
  status: ''
})
const formLabelWidth = '140px'
const props = defineProps({
  roleInfo: Object
})
const currnetStatus = ref('')
const statusChangeForm = ref<FormInstance>()
const emit = defineEmits(['updateSuccess'])

const sectionStatusText = ['隐藏', '待更新', '已发布']
const initDialog = (id, data) => {
  form.id = id
  currnetStatus.value = sectionStatusText[data.status]
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
