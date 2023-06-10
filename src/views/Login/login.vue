<template>
  <div class="login">
    <el-form ref="formData" :model="form" label-width="80px" label-position="top">
      <h2>登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import ElMessage from 'element-plus/lib/components/message/index.js'
import { reactive,ref } from 'vue';

const form = reactive({
  phone: "18201288771",
  password: '111111'
})

const onSubmit = () => {
  ElMessage.success('创建成功')
}
</script>

<style lang="scss" scoped>
.login {
  background-color: #eee;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-form {
    width: 300px;
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    .el-form-item {
      margin-top: 10px;
    }
    .el-button {
      width: 100%;
      margin-top: 10px;
    }
  }
}
</style>
