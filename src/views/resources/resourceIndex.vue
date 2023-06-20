<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <h3>资源类别列表</h3>
      </div>
    </template>
    <el-form :model="queryParams" ref="formRef" label-width="120px" :label-position="'right'">
      <el-row type="flex" gutter="10">
        <el-col :span="6">
          <el-form-item label="资源名称" prop="name">
            <el-input v-model="queryParams.name" placeholder="请输入资源名称" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="资源路径" prop="url">
            <el-input v-model="queryParams.url" placeholder="请输入资源路径" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="资源分类" prop="categoryId">
            <el-select v-model="queryParams.categoryId" placeholder="请选择资源分类">
              <el-option label="不限" value="" />
              <el-option
                v-for="item in resourceType"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="padding-left: 20px">
          <el-row type="flex" justify="start">
            <el-button type="info" @click="handleReset">重置</el-button>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col>
        <el-button type="primary" @click="handleAddResource">添加资源</el-button>
        <el-button type="primary" @click="handleJumpCategory">资源类别</el-button>
      </el-col>
    </el-row>
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
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="queryParams.size"
      :small="small"
      layout="total, prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <ResourceType
      ref="dialogResourceType"
      @updateSuccess="dialogUpdateHandle"
      :resourceTypeInfo="resourceTypeInfo"
    ></ResourceType>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { getResourceList } from '@/api/resources.ts'
import { getAllResource } from '@/api/resource-category'
import type { Condition } from '@/api/resources.ts'
import { useRouter } from 'vue-router'
import ElMessage from 'element-plus/lib/components/message/index.js'
import dayjs from 'dayjs'
import { FormInstance } from 'element-plus/lib/components'
import ResourceType from './components/update-form.vue'
onMounted(() => {
  getResourceType() // 获取资源分类List
  queryList()
})
const router = useRouter()
let tableData = reactive([])
let total = ref(0)

let queryParams = reactive<Condition>({
  name: '',
  url: '',
  categoryId: '',
  current: 1,
  size: 20
})
const formRef = ref<FormInstance>()
const handleReset = () => {
  formRef.value?.resetFields()
}
const handleSearch = () => {
  queryParams.current = 1
  queryList()
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
const tableConfig = reactive([
  { label: '序号', width: '80', align: 'center', prop: '', type: 'index' },
  { label: '资源名称', prop: 'name', align: 'center' },
  { label: '资源路径', prop: 'url', align: 'center' },
  { label: '描述', prop: 'description', align: 'center' },
  {
    label: '添加时间',
    prop: 'createdTime',
    align: 'center',
    formatter: (row: any, column: any, value: string) => {
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
    }
  }
])
let tableLoading = ref(false)
const small = ref(false)
const queryList = () => {
  tableLoading.value = true
  getResourceList(queryParams)
    .then((res) => {
      tableLoading.value = false
      if (res.data.code === '000000') {
        let result = res.data.data
        tableData = result.records
        total.value = result.total
      } else {
        ElMessage.error('获取资源列表失败')
        throw new Error('获取资源列表失败')
      }
    })
    .catch((err) => {
      tableLoading.value = false
      console.log(err)
    })
}
const currentPage = ref(0)
// 点击右侧分页
const handleCurrentChange = (value) => {
  queryParams.current = value
  queryList()
}

const handleDelete = (row) => {
  console.log(row)
}
const handleJumpCategory = (row) => {
  router.push({ name: 'resource-category' })
}
const resourceTypeInfo = ref({})
const dialogUpdateHandle = () => {
  queryList()
}
const dialogResourceType = ref<InstanceType<typeof ResourceType> | null>(null)
const handleAddResource = () => {
  resourceTypeInfo.value = {}
  dialogResourceType.value?.initShow()
}

const handleEditCategory = (row) => {
  resourceTypeInfo.value = {
    id: row.id,
    name: row.name,
    url: row.url,
    description: row.description,
    categoryId: row.categoryId
  }
  dialogResourceType.value?.initShow(1)
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
