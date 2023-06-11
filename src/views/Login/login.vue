<template>
  <div class="login">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
      label-position="top"
    >
      <h2>登录</h2>
      <el-form-item label="用户名" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(ruleFormRef)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormRules, FormInstance } from 'element-plus/lib/components/form/index.js'
import ElMessage from 'element-plus/lib/components/message/index.js'
import { reactive, ref } from 'vue'
import {login} from '@/api/user'
const ruleForm = reactive({
  phone: '18201288771',
  password: '111111'
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  phone: [
    { required: true, message: '手机号码不能为空', trigger: 'blur' },
    { pattern: /^1\d{10}$/, message: '手机号位数为11位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 18, message: '密码长度需要6~18位', trigger: 'blur' }
  ]
})

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      const params = {
        phone: ruleForm.phone,
        password: ruleForm.password
      }
      login(params).then(res => {
        console.log(res)
        const {data} = res
        if(data.success){
          ElMessage.success('登录成功')
          localStorage.setItem('token',data.content)
        }
      })
      ElMessage.success('submit successful')
    } else {
      ElMessage.error('submit successful')
      console.log('error submit!', fields)
    }
  })
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
