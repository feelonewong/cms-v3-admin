<template>
  <el-dialog v-model="dialogFormVisible" title="分配角色" :close-on-click-modal="false">
    <el-form :model="form">
      <el-form-item label="角色名称" :label-width="formLabelWidth" prop="hasRoleIds">
        <el-select v-model="form.hasRoleIds" multiple placeholder="Select" style="width: 240px">
          <el-option
            v-for="(item, index) in roleList"
            :key="index"
            :label="item.name"
            :value="item.id"
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
import { getRoleByUserId } from '@/api/user'
onMounted(() => {})
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive({
  hasRoleIds: []
})
const props = defineProps({
  allocRole: Object
})
onMounted(() => {})
const roleList = ref([])
const emit = defineEmits(['updateSuccess'])
const initShow = (row: any) => {
  getUserRoleList(row.id)
}
const getUserRoleList = (id: string | number) => {
  getRoleByUserId(id)
    .then((res) => {
      const result = res.data
      if (result.code === '000000') {
        roleList.value = res.data.data
        form.hasRoleIds = res.data.data
          .filter((item: any) => item.hasPermission)
          .map((item: any) => item.id)
        setTimeout(() => {
          dialogFormVisible.value = true
        }, 200)
      } else {
        ElMessage.error(result.mesg)
      }
    })
    .catch((err) => {
      ElMessage.error(err)
    })
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
