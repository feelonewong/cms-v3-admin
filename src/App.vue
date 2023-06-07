<script setup lang="ts">
import ElMessage from 'element-plus/lib/components/message/index.js'
import { RouterView } from 'vue-router'
function handleClick() {
  ElMessage.success('按需导入')
}
</script>

<template>
  <el-button type="primary" @click="handleClick">primary button</el-button>
  <RouterView />
</template>

<style scoped></style>
