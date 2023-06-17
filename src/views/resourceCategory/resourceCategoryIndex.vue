<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <h3>资源类别列表</h3>
        <el-button class="button" type="primary" @click="handleCreateCategory">创建类别</el-button>
      </div>
    </template>
    <el-table :data="tableData" border style="width: 100%" v-loading="tableLoading">
      <el-table-column v-for="(item, index) in tableConfig" :key="index" :label="item.label" :align="item.align"
        :width="item.width" :prop="item.prop" :formatter="item.formatter" :type="item.type"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button type="primary" @click="handleEditCategory(scope.row.id)">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <DialogResource ref="dialogResource" @updateSuccess="dialogUpdateHandle"></DialogResource>
</template>
  
<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue'
import { getAllResource } from '@/api/resource-category'
import type { ResourceCategoryItem } from '@/api/resource-category'
import ElMessage from 'element-plus/lib/components/message/index.js';
import DialogResource from './components/resource-update.vue'
import dayjs from 'dayjs'
const tableConfig = ref([{
  label: '编号',
  prop: '',
  width: '130',
  align: 'center',
  type: 'index'
}, {
  label: '类别名称',
  align: 'center',
  prop: 'name'
}, {
  label: '创建时间',
  align: 'center',
  prop: 'createdTime',
  formatter: (row: ResourceCategoryItem, column: any, value: string) => {
    return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
  }
}, {
  label: '排序',
  align: 'center',
  prop: 'sort'
}
])
const tableLoading = ref(false)
onMounted(() => {
  getResourceList()
})
let tableData = reactive<ResourceCategoryItem[]>([])
const getResourceList = () => {
  tableLoading.value = true
  getAllResource().then(res => {
    tableLoading.value = false
    const { code } = res.data
    if (code === '000000') {
      tableData = res.data.data
    } else {
      ElMessage.error('获取资源列表失败')
      throw new Error('获取资源列表失败')
    }
  }).catch(err => {
    console.log(err)
    tableLoading.value = false
  })
}
// 获取dialog组件引用
const dialogResource = ref<InstanceType<typeof DialogResource> | null>(null)
const handleCreateCategory = () => {
  dialogResource.value?.initShow(0)
}
const handleEditCategory = (id: number) => {
  dialogResource.value?.initShow(id)
}
const dialogUpdateHandle = (flag: boolean) => {
  if (flag) {
    getResourceList()
  }
}
</script>
  
<style lang="scss" scoped>
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