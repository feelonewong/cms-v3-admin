<template>
  <el-dialog v-model="dialogFormVisible" :title="`${msgText}角色`" :close-on-click-modal="false">
    <el-form :model="form" ref="roleInfoForm">
      <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色编码" :label-width="formLabelWidth" prop="code">
        <el-input v-model="form.code" autocomplete="off" />
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth" prop="description">
        <el-input
          style="width: 300px"
          type="textarea"
          v-model="form.description"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick, onMounted } from 'vue'
import { ElMessage, type FormInstance } from 'element-plus/lib/components/index.js'
import { updateResourceType } from '@/api/resources'
onMounted(() => {})
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive({
  name: '',
  code: '',
  description: ''
})
const props = defineProps({
  roleInfo: Object
})
const roleInfoForm = ref<FormInstance>()
const emit = defineEmits(['updateSuccess'])
const msgText = ref('')
const initShow = (id: number) => {
  nextTick(() => {
    if (!id) {
      // 新建
      roleInfoForm.value?.resetFields()
      msgText.value = '新增'
    } else {
      // 编辑
      msgText.value = '编辑'
      console.log(props.roleInfo)
      form.name = props.roleInfo?.name
      form.code = props.roleInfo?.code
      form.description = props.roleInfo?.description
    }
  })
  dialogFormVisible.value = true
}
const handleSubmit = () => {
  let params = {
    id: props.roleInfo?.id,
    ...form
  }
  updateResourceType(params).then((res) => {
    const { data } = res
    if (data.code === '000000') {
      ElMessage.success(`${msgText.value}角色成功`)
      emit('updateSuccess', true)
      dialogFormVisible.value = false
    } else {
      ElMessage.error(`${msgText.value}角色失败`)
      throw new Error(`${msgText.value}角色失败`)
    }
  })
}
const resourceType = ref([])

defineExpose({ initShow })
</script>

<style lang="scss" scoped>
.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
