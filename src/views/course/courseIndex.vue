<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <h3 class="title">课程管理列表</h3>
        <div class="card-header">
          <el-form
            :model="queryCondition"
            ref="formRef"
            label-width="70px"
            :label-position="'right'"
          >
            <el-row type="flex" gutter="10">
              <el-col :span="4">
                <el-form-item label="课程名称" prop="courseName">
                  <el-input
                    style="width: 320px"
                    v-model="queryCondition.courseName"
                    placeholder="请输入课程名称"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="状态" prop="status">
                  <el-select v-model="queryCondition.status" class="m-2" placeholder="请选择状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="启用" value="1"></el-option>
                    <el-option label="弃用" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-row type="flex" justify="start">
                  <el-button type="primary" @click="handleSearch">搜索</el-button>
                </el-row>
              </el-col>
            </el-row>
            <el-button type="primary" @click="handleAddCourse">新建课程</el-button>
          </el-form>
        </div>
      </template>
      <el-table :data="tableData" height="580" border style="width: 100%" v-loading="tableLoading">
        <template v-for="(item, index) in tableConfig" :key="index">
          <el-table-column
            v-if="item.prop != 'status'"
            :label="item.label"
            :align="item.align"
            :prop="item.prop"
          ></el-table-column>
          <el-table-column v-if="item.prop === 'status'" :label="item.label" :align="item.align">
            <template #default="scope">
              <el-switch
                v-model="scope.row.status"
                class="mb-2"
                :active-value="1"
                :INACTIVE-VALUE="0"
                active-text="上架"
                inactive-text="下架"
                @click="handleStatusChange($event, scope.row)"
              />
            </template>
          </el-table-column>
        </template>

        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="primary" @click="handleContentManage(scope.row)">内容管理</el-button>
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
  </div>
</template>

<script lang="ts" setup>
import { getQueryCourses, changeState } from '@/api/course'
import type { QueryCondition } from '@/api/course'
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import ElMessage from 'element-plus/lib/components/message/index.js'
const tableLoading = ref(false)
const tableData = ref([])
const router = useRouter()
const tableConfig = reactive([
  {
    label: 'ID',
    align: 'center',
    prop: 'id'
  },
  {
    label: '课程名称',
    align: 'center',
    prop: 'courseName'
  },
  {
    label: '排序',
    align: 'center',
    prop: 'sortNum'
  },
  {
    label: '价格',
    align: 'center',
    prop: 'price'
  },
  {
    label: '课程状态',
    align: 'center',
    prop: 'status'
  }
])
const queryCondition = reactive<QueryCondition>({
  currentPage: 1,
  pageSize: 20,
  courseName: '',
  status: ''
})
const total = ref(0)
onMounted(() => {
  queryList()
})
const queryList = () => {
  tableLoading.value = true
  getQueryCourses(queryCondition)
    .then((res) => {
      tableLoading.value = false
      const result = res.data
      if (result.code === '000000') {
        total.value = result.data.total
        tableData.value = result.data.records
        flag.value = true
      }
    })
    .catch((err) => {
      ElMessage.error(err.message)
      tableLoading.value = false
    })
}
const handleSearch = () => {
  queryCondition.currentPage = 1
  queryList()
}
const handleAddCourse = () => {
  router.push('/course/create')
}
const handleEdit = (row: any) => {
  router.push({
    path: `/course/${row.id}/edit`
  })
}
const handleContentManage = (row: any) => {
  console.log(row)
  router.push({
    path: `/course/${row.id}/content`,
    query: {
      courseName: row.courseName
    }
  })
}
const handleCurrentChange = (value: number) => {
  queryCondition.currentPage = value
  queryList()
}
const flag = ref(false)
const handleStatusChange = (col: object, row: any) => {
  changeState(row.id, row.status)
    .then((res) => {
      const result = res.data
      if (result.code === '000000') {
        ElMessage.success('操作成功')
      } else {
        ElMessage.error(result.message)
      }
    })
    .catch((err) => {
      ElMessage.error(err.message)
    })
    .finally(() => {})
}
</script>

<style scoped lang="scss">
.card-header {
  margin-top: 15px;
}
</style>
