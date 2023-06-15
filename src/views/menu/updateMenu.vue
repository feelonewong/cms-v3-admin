<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="菜单名称">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="菜单路径">
      <el-input v-model="form.href" />
    </el-form-item>
    <el-form-item label="上级菜单">
      <el-select v-model="form.parentId" placeholder="请选择你的上级菜单" style="width: 100%">
        <el-option label="顶层菜单" :value="'-1'" />
        <el-option v-for="(item, index) in topMenus" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="图标">
      <el-input v-model="form.icon" />
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="form.description" />
    </el-form-item>
    <el-form-item label="是否显示">
      <el-radio-group v-model="form.shown">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="排序">
      <el-input v-model="form.orderNum" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
  
<script setup lang='ts'>
import { useMenu } from '@/composables/useMenu'
import { updatedMenus, getMenuDetById } from "@/api/menus"
import { onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus/lib/components/index.js';
import { useRouter, useRoute } from "vue-router"
const route = useRoute()

onMounted(async () => {
  await getMenus()

  // 如果有id就是编辑，没有id就是新增
  const { id } = route.params
  if (id) {
    const params = id as number | string
    getMenuDetById(params).then(res => {
      const { data } = res.data
      if (res.data.code === '000000') {
        const { menuInfo } = data
        form.name = menuInfo.name
        form.href = menuInfo.href
        form.parentId = menuInfo.parentId
        form.shown = menuInfo.shown
        form.icon = menuInfo.icon
        form.orderNum = menuInfo.orderNum
        form.description = menuInfo.description
      } else {
        ElMessage.error('获取菜单详情失败')
        throw new Error('获取菜单详情失败')
      }
    }).catch(err => {
      console.log(err)
    })
  } else {
    console.log('新增')
  }
})

const { getMenus, topMenus } = useMenu();
const router = useRouter()
// do not use same name with ref
const form = reactive({
  name: '',
  href: '',
  parentId: '-1',
  shown: '',
  icon: '',
  orderNum: '',
  description: ''
})

const onSubmit = () => {
  const params = {
    name: form.name,
    href: form.href,
    parentId: form.parentId,
    shown: form.shown,
    icon: form.icon,
    orderNum: form.orderNum,
    description: form.description
  }
  updatedMenus(params).then(res => {
    console.log(res)
    if (res.data.code === '000000') {
      ElMessage.success('添加菜单成功')

      router.push('/menus')
    } else {
      ElMessage.error('添加菜单失败')
      throw new Error('添加菜单失败')
    }
  })
}
</script>
  
<style lang="scss" scoped>
.form {
  background: #fff;
  padding: 70px;
}
</style>