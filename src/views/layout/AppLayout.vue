<template>
  <div class="common-layout">
    <el-container>
      <app-aside></app-aside>
      <el-container class="header-and-main">
        <app-header></app-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import AppAside from './AppAside.vue'
import AppHeader from './AppHeader.vue'
</script>

<style lang="scss" scoped>
.header-and-main {
  flex-direction: column;
}
</style>
