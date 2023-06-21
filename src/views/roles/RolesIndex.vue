<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <h3>资源类别列表</h3>
      </div>
    </template>
    <el-table :data="tableData" height="580" border style="width: 100%" v-loading="tableLoading">
      <el-table-column
        v-for="(item, index) in tableConfig"
        :key="index"
        :label="item.label"
        :align="item.align"
        :width="item.width"
        :prop="item.prop"
        :formatter="item.formatter"
        :type="item.type"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button type="primary" @click="handleEditCategory(scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { getRolePages } from '@/api/roles'
import ElMessage from 'element-plus/lib/components/message/index.js'
onMounted(() => {
  queryList() // 加载列表
})
const queryParams = reactive({
  name: '',
  size: 20,
  current: 1
})
let total = ref(0)
const tableConfig = reactive([])
let tableLoading = ref(false)
let tableData = reactive([])
const queryList = () => {
  tableLoading.value = true
  getRolePages(queryParams)
    .then((res) => {
      tableLoading.value = false
      const result = res.data
      if (result.code === '000000') {
        tableData = result.data.records
        total.value = result.data.total
      } else {
        ElMessage.error('获取角色列表失败')
      }
    })
    .catch((err) => {
      console.log(err)
      tableLoading.value = false
      throw new Error('获取角色列表失败')
    })
}
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 10px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: auto;
}
</style>
