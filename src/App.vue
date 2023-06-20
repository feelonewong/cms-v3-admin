<template>
  <el-config-provider :locale="zhCn">
    <RouterView />
  </el-config-provider>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import zhCn from 'element-plus/dist/locale/zh-cn.js'
// import request from '@/utils/request'
onMounted(() => {
  // request({
  //   url: '/ad/getAdList',
  //   method: 'GET'
  // }).then((res: Object) => {
  //   console.log(res)
  // })
})
</script>

<style scoped></style>
