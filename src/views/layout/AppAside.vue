<template>
  <el-aside>
    <el-menu router unique-opened :collapse="isCollapse">
      <a href="/" class="logo">
        <img src="@/assets/logo.svg" />
        <h1>水哥澎湃</h1>
      </a>
      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <IEpSetting></IEpSetting>
          </el-icon>
          <span>权限管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/menus"><IEpSetting></IEpSetting>菜单列表</el-menu-item>
          <el-menu-item index="/resources"><IEpSetting></IEpSetting>资源列表</el-menu-item>
          <el-menu-item index="/roles"><IEpSetting></IEpSetting>角色列表</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon>
            <IEpSetting></IEpSetting>
          </el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/users"><IEpSetting></IEpSetting>角色列表</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon>
            <IEpSetting></IEpSetting>
          </el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/course"><IEpSetting></IEpSetting>课程管理</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <el-icon>
            <IEpSetting></IEpSetting>
          </el-icon>
          <span>广告管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/advertisement">广告列表</el-menu-item>
          <el-menu-item index="/advertising-space">广告位管理</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isCollapse = ref(false)
</script>

<style lang="scss" scoped>
.el-aside {
  background-color: #eee;
  height: 100vh;
  width: auto;
}
.el-menu {
  background-color: #eee;
  width: 200px;
  border-right: none;
  &.el-menu--collapse {
    width: 64px;
    & h1 {
      display: none;
    }
  }
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: black;
  height: 60px;
  img {
    width: 32px;
    height: 32px;
  }
}
</style>
