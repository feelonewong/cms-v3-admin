<template>
  <el-dialog v-model="dialogFormVisible" :title="`资源类型${msgText}表单`">
    <el-form :model="form" ref="resourceTypeForm">
      <el-form-item label="类别类型名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="资源分类" :label-width="formLabelWidth" prop="categoryId">
        <el-select v-model="form.categoryId" placeholder="请选择资源分类">
          <el-option label="不限" value="" />
          <el-option
            v-for="item in resourceType"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资源路径" :label-width="formLabelWidth" prop="url">
        <el-input v-model="form.url" autocomplete="off" />
      </el-form-item>
      <el-form-item label="资源描述" :label-width="formLabelWidth" prop="description">
        <el-input type="textarea" v-model="form.description" autocomplete="off" />
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
import { getAllResource } from '@/api/resource-category'
import { ElMessage, type FormInstance } from 'element-plus/lib/components/index.js'
import { updateResourceType } from '@/api/resources'
onMounted(() => {
  getResourceType() // 获取资源分类List
})
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive({
  name: '',
  categoryId: '',
  url: '',
  description: ''
})
const props = defineProps({
  resourceTypeInfo: Object
})
const resourceTypeForm = ref<FormInstance>()
const emit = defineEmits(['updateSuccess'])
const msgText = ref('')
const initShow = (id: number) => {
  nextTick(() => {
    if (!id) {
      // 新建
      resourceTypeForm.value?.resetFields()
      msgText.value = '新增'
    } else {
      // 编辑
      msgText.value = '编辑'
      form.name = props.resourceTypeInfo?.name
      form.url = props.resourceTypeInfo?.url
      form.description = props.resourceTypeInfo?.description
      form.categoryId = props.resourceTypeInfo?.categoryId
    }
  })
  dialogFormVisible.value = true
}
const handleSubmit = () => {
  let params = {
    id: props.resourceTypeInfo?.id,
    ...form
  }
  updateResourceType(params).then((res) => {
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
const resourceType = ref([])
const getResourceType = () => {
  resourceType.value = []
  getAllResource()
    .then((res) => {
      if (res.data.code === '000000') {
        resourceType.value = res.data.data
      } else {
        ElMessage.error('获取资源类别失败')
        throw new Error('获取资源类别失败')
      }
    })
    .catch((err) => {
      console.log(err)
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
