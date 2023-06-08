<template>
  <el-button @click="handleText">ccc</el-button>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import request from '@/utils/request'

function handleText() {
  request({
    url: '/front/ad/getAdList',
    method: 'GET'
  }).then((res) => {
    console.log(res)
  })
}
</script>

<style scoped></style>
