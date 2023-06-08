<template>
  <div class="common-layout">
    <el-container>
      <app-aside></app-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import AppAside from './AppAside.vue'
</script>

<style></style>
