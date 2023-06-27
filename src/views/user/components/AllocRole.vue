<template>
  <el-dialog v-model="dialogFormVisible" title="分配角色" :close-on-click-modal="false">
    <el-form :model="form">
      <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
        <el-select v-model="form.name" multiple placeholder="Select" style="width: 240px">
          <el-option
            v-for="item in roleList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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

onMounted(() => {})
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive({
  name: ''
})
const props = defineProps({
  allocRole: Object
})
const roleList = ref([])
const emit = defineEmits(['updateSuccess'])
const initShow = (row) => {
  console.log(row)
  dialogFormVisible.value = true
}
const handleSubmit = () => {
  let params = {}
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
