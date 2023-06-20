<template>
  <el-dialog v-model="dialogFormVisible" :title="`${msgText}表单`">
    <el-form :model="form" ref="categoryRef">
      <el-form-item label="类别名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
        <el-input v-model="form.sort" autocomplete="off" />
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
import { ref, reactive, nextTick } from 'vue'
import { saveOrUpdateResource } from '@/api/resource-category'
import { ElMessage, type FormInstance } from 'element-plus/lib/components/index.js'
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive({
  name: '',
  sort: 0
})
const props = defineProps({
  categoryInfo: Object
})
const categoryRef = ref<FormInstance>()
const emit = defineEmits(['updateSuccess'])
const msgText = ref('')
const initShow = (id: number) => {
  nextTick(() => {
    if (!id) {
      // 新建
      categoryRef.value?.resetFields()
      msgText.value = '新增'
    } else {
      // 编辑
      msgText.value = '编辑'
      form.name = props.categoryInfo?.name
      form.sort = props.categoryInfo?.sort
    }
  })
  dialogFormVisible.value = true
}
const handleSubmit = () => {
  let params = {
    id: props.categoryInfo?.id,
    name: form.name,
    sort: form.sort
  }
  saveOrUpdateResource(params).then((res) => {
    const { data } = res
    if (data.code === '000000') {
      ElMessage.success(`${msgText.value}资源类型成功`)
      emit('updateSuccess', true)
      dialogFormVisible.value = false
    } else {
      ElMessage.error(`${msgText.value}资源类型失败`)
      throw new Error(`${msgText.value}资源类型失败`)
    }
  })
}
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
