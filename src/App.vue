<script setup lang="ts">
import ElMessage from 'element-plus/lib/components/message/index.js'
import { RouterView } from 'vue-router'
// import { Setting } from '@element-plus/icons-vue'
function handleClick() {
  ElMessage.success('按需导入')
}
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
