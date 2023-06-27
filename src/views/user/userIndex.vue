<template>
  <el-card class="box-card">
    <template #header>
      <h3 class="title">角色列表</h3>
      <div class="card-header">
        <el-form :model="queryCondition" ref="formRef" label-width="70px" :label-position="'right'">
          <el-row type="flex" gutter="10">
            <el-col :span="8">
              <el-form-item label="手机号" prop="name">
                <el-input
                  style="width: 220px"
                  v-model="queryCondition.phone"
                  placeholder="请输入手机号"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册时间" prop="name">
                <el-date-picker
                  v-model="dateRange"
                  type="daterange"
                  range-separator="To"
                  value-format="YYYY-MM-DD"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-row type="flex" justify="start">
                <el-button type="primary" @click="handleSearch">搜索</el-button>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </template>
    <el-table :data="tableData" height="580" border style="width: 100%" v-loading="tableLoading">
      <template v-for="(item, index) in tableConfig" :key="index">
        <el-table-column
          v-if="item.prop != 'portrait' && item.prop != 'status'"
          :label="item.label"
          :align="item.align"
          :prop="item.prop"
        ></el-table-column>
        <el-table-column
          v-if="item.prop === 'portrait'"
          :label="item.label"
          :align="item.align"
          :prop="item.prop"
        >
          <template #default="scope">
            <el-avatar :size="50" :src="scope.row.portrait" />
          </template>
        </el-table-column>
        <el-table-column v-if="item.prop === 'status'" :label="item.label" :align="item.align">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              class="mb-2"
              active-value="ENABLE"
              INACTIVE-VALUE="DISABLE"
              active-text="启用"
              inactive-text="禁用"
            />
          </template>
        </el-table-column>
      </template>

      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button type="primary" @click="handleAllocRole(scope.row)">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="queryCondition.currentPage"
      :page-size="queryCondition.pageSize"
      layout="total, prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </el-card>
</template>

<script lang="ts" setup>
import { getUserList } from '@/api/user'
import type { QueryCondition } from '@/api/user'
import { onMounted, reactive, ref, watch } from 'vue'
import ElMessage from 'element-plus/lib/components/message/index.js'

onMounted(() => {
  getPage()
})
const tableConfig = [
  {
    label: '用户ID',
    align: 'center',
    prop: 'id'
  },
  {
    label: '头像',
    align: 'center',
    prop: 'portrait'
  },
  {
    label: '用户名',
    align: 'center',
    prop: 'name'
  },
  {
    label: '手机号',
    align: 'center',
    prop: 'phone'
  },
  {
    label: '注册时间',
    align: 'center',
    prop: 'updateTime'
  },
  {
    label: '状态',
    align: 'center',
    prop: 'status'
  }
]
const queryCondition = ref<QueryCondition>({
  currentPage: 1,
  pageSize: 20,
  phone: '',
  startCreateTime: '',
  endCreateTime: ''
})
const dateRange = ref('')
watch(dateRange, (newTime) => {
  if (Array.isArray(newTime)) {
    queryCondition.value.startCreateTime = newTime[0]
    queryCondition.value.endCreateTime = newTime[1]
  } else {
    queryCondition.value.startCreateTime = ''
    queryCondition.value.endCreateTime = ''
  }
})
let tableData = reactive([])
const tableLoading = ref(false)
const total = ref(0)
const handleSearch = () => {
  queryCondition.value.currentPage = 1
  getPage()
}
const handleReset = () => {}
const getPage = () => {
  tableLoading.value = true
  getUserList(queryCondition.value)
    .then((res) => {
      tableLoading.value = false
      const result = res.data
      if (result.code === '000000') {
        tableData = result.data.records
        total.value = result.data.total
      }
    })
    .catch((err) => {
      ElMessage.error(err)
      tableLoading.value = false
    })
}
const handleAllocRole = (row: any) => {
  console.log(row)
}
const handleCurrentChange = (pageNumber: number) => {
  queryCondition.value.currentPage = pageNumber
  getPage()
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
