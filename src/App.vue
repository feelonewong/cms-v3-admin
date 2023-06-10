<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
// import request from '@/utils/request'
onMounted(() => {
  console.log('App mounted!')
  // request({
  //   url: '/ad/getAdList',
  //   method: 'GET'
  // }).then((res: Object) => {
  //   console.log(res)
  // })
})
</script>

<style scoped></style>
