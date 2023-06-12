<template>
  <el-header>
    <!-- 图标 -->
    <el-icon @click="isCollapse = !isCollapse">
      <i-ep-expand v-if="isCollapse"></i-ep-expand>
      <i-ep-fold v-else></i-ep-fold>
    </el-icon>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">权限列表</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头像 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="30" :src="userInfo.circleUrl" />
        <el-icon class="el-icon--right">
          <i-ep-arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
          <el-dropdown-item divided>退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { isCollapse } from './isCollapse'
import {getInfo} from '@/api/user'
onMounted(() => {
  getUserInfo()
});
const userInfo = reactive({
  circleUrl: "",
  userName: ""
})
const getUserInfo = () =>{
  getInfo().then(res => {
    const { userName, portrait } = res.data.content
    userInfo.circleUrl = portrait
    userInfo.userName = userName
  })
}
</script>

<style lang="scss" scoped>
.el-header {
  display: flex;
  background-color: #eee;
  align-items: center;
  .el-icon {
    cursor: pointer;
    margin-right: 17px;
  }
  .el-dropdown {
    margin-left: auto;
    .el-dropdown-link {
      display: flex;
      align-items: center;
    }
  }
}
</style>
