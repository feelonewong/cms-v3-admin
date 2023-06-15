<template>
  <div>资源列表</div>
</template>
  
<script setup lang='ts'>
import { onMounted, reactive } from 'vue'
import { getAllResource } from '@/api/resource-category'
import type { ResourceCategoryItem } from '@/api/resource-category'
import ElMessage from 'element-plus/lib/components/message/index.js';

let tableData = reactive<ResourceCategoryItem[]>([])
onMounted(() => {
  getAllResource().then(res => {
    const { code } = res.data
    if (code === '000000') {
      tableData = res.data.data
    } else {
      ElMessage.error('获取资源列表失败')
      throw new Error('获取资源列表失败')
    }
  })
})


</script>
  
<style lang="scss" scoped></style>