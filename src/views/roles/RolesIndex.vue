<template>
  <el-card class="box-card">
    <template #header>
      <h3 class="title">角色列表</h3>
      <div class="card-header">
        <el-form :model="queryParams" ref="formRef" label-width="70px" :label-position="'right'">
          <el-row type="flex" gutter="10">
            <el-col :span="12">
              <el-form-item label="输入搜索" prop="name">
                <el-input
                  style="width: 420px"
                  v-model="queryParams.name"
                  placeholder="请输入角色名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-row type="flex" justify="start">
                <el-button type="info" @click="handleReset">重置</el-button>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
              </el-row>
            </el-col>
          </el-row>
          <el-button type="primary" @click="handleAddRole">添加角色</el-button>
        </el-form>
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
      <el-table-column label="操作" align="center" width="420">
        <template #default="scope">
          <el-button type="primary" @click="handleAllocMenu(scope.row)">分配菜单</el-button>
          <el-button type="primary" @click="handleAllocResource(scope.row.id)">分配资源</el-button>
          <el-button type="danger" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="queryParams.size"
      layout="total, prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </el-card>
  <update-role ref="dialogUpdateRole" :roleInfo="roleInfo" @update="dialogUpdate"></update-role>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { getRolePages } from '@/api/roles'
import ElMessage from 'element-plus/lib/components/message/index.js'
import dayjs from 'dayjs'
import { FormInstance } from 'element-plus/lib/components'
import UpdateRole from './components/update-role.vue'
onMounted(() => {
  queryList() // 加载列表
})
const queryParams = reactive({
  name: '',
  size: 20,
  current: 1
})
let total = ref(0)
const tableConfig = reactive([
  {
    type: 'index',
    label: '序号',
    width: 80,
    align: 'center'
  },
  {
    label: '角色名称',
    prop: 'name',
    align: 'center'
  },
  {
    label: '角色描述',
    prop: 'description',
    align: 'center'
  },
  {
    label: '添加时间',
    prop: 'createTime',
    align: 'center',
    formatter: (row: any) => {
      return dayjs(row.createTime).format('YYYY-MM-DD')
    }
  }
])
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
const handleSearch = () => {
  queryParams.current = 1
  queryList()
}
const currentPage = ref(1)
const formRef = ref<FormInstance>()
const handleReset = () => {
  formRef.value?.resetFields()
}
let roleInfo = ref({})
const dialogUpdateRole = ref<InstanceType<typeof UpdateRole> | null>(null)
// 添加角色
const handleAddRole = (row) => {
  roleInfo.value = {}
  dialogUpdateRole.value?.initShow()
}
// 分配菜单
const handleAllocMenu = (row) => {}
// 分配资源
const handleAllocResource = (row) => {}
// 编辑
const handleEdit = (row) => {
  console.log(row)
  roleInfo.value = {
    id: row.id,
    code: row.code,
    name: row.name,
    description: row.description
  }
  dialogUpdateRole.value?.initShow(1)
}
// 删除
const handleDelete = (row) => {}
const handleCurrentChange = (value) => {
  queryParams.current = value
  queryList()
}
const dialogUpdate = () => {
  queryList()
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

.title {
  margin-bottom: 20px;
}
</style>
