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
          <el-dropdown-item divided @click="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { isCollapse } from './isCollapse'
import { getInfo, logout } from '@/api/user'
import { useTokenStore } from '@/stores/token'
import { useRouter } from 'vue-router'
import ElMessage from 'element-plus/lib/components/message/index.js'
import { ElMessageBox } from 'element-plus/lib/components/index.js'
import { useRoute } from 'vue-router'
onMounted(() => {
  getUserInfo()
})
const route = useRoute()
const useToken = useTokenStore()
const router = useRouter()
const userInfo = reactive({
  circleUrl: '',
  userName: ''
})
const getUserInfo = () => {
  getInfo().then((res) => {
    const { userName, portrait } = res.data.content
    userInfo.circleUrl = portrait
    userInfo.userName = userName
  })
}
const handleLogout = async () => {
  await ElMessageBox.confirm('确认退出吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).catch(() => {
    ElMessageBox.confirm('取消退出')
    return new Promise(() => {})
  })
  logout().then((res) => {
    if (res.data.success) {
      ElMessage.success('退出成功')
      useToken.saveToken('')
      router.push('/login')
    }
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
