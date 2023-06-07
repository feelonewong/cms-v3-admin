<script setup lang="ts">
import ElMessage from 'element-plus/lib/components/message/index.js'
import { RouterView } from 'vue-router'
// import { Setting } from '@element-plus/icons-vue'
function handleClick() {
  ElMessage.success('按需导入')
}
</script>

<template>
  <el-icon>
    <i-ep-setting></i-ep-setting>
  </el-icon>
  <el-button type="primary" @click="handleClick">primary button</el-button>
  <RouterView />
</template>

<style scoped></style>
