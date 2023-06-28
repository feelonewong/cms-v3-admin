<template>
  <div>课程管理</div>
</template>

<script lang="ts" setup>
import { getQueryCourses } from '@/api/course'
import type { QueryCondition } from '@/api/course'
import { ref, onMounted, reactive } from 'vue'
const tableData = ref([])
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
  getQueryCourses(queryCondition).then((res) => {
    const result = res.data
    if (result.code === '000000') {
      total.value = result.data.total
      tableData.value = result.data.records
    }
  })
}
</script>

<style scoped lang="scss"></style>
