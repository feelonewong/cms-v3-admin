<template>
  <div>
    <h2>分配菜单-</h2>
    <el-tree
      :props="treeProps"
      :default-checked-keys="defaultCheckedKeys"
      :data="menuList"
      node-key="id"
      ref="menuTree"
      default-expand-all
      show-checkbox
    />
    <el-button @click="handleUpdate">更新</el-button>
    <el-button @click="handleClear">清空</el-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { allocRoleList } from '@/api/roles'
import type { RoleMenuItem } from '@/api/roles'
import ElMessage from 'element-plus/lib/components/message/index.js'
import type { Instance } from 'element-plus'
import { ElTree } from 'element-plus'
import { updateTreeList } from '@/api/roles'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  roleId: {
    type: String,
    required: true
  }
})
onMounted(() => {
  getAlloMenu()
})
const treeProps = {
  label: 'name',
  children: 'subMenuList'
}
const defaultCheckedKeys = ref([])
let menuList = ref<RoleMenuItem[]>([])
// 获取所有菜单
const getAlloMenu = () => {
  const id = props.roleId
  allocRoleList(id)
    .then((res) => {
      const result = res.data
      if (result.code === '000000') {
        menuList.value = result.data
        console.log(menuList.value)
        getCheckedId(menuList.value)
      } else {
        ElMessage.error('获取菜单失败')
        throw new Error('获取菜单失败')
      }
    })
    .catch((err) => {
      ElMessage.error('获取菜单失败')
      console.log(err)
    })
}

const getCheckedId = (arr: RoleMenuItem[]) => {
  defaultCheckedKeys.value = []
  arr.forEach((item) => {
    if (item.subMenuList && item.subMenuList.length > 0) {
      getCheckedId(item.subMenuList)
    } else if (item.selected) {
      defaultCheckedKeys.value.push(item.id)
    }
  })
}
const menuTree = ref<Instance<typeof ElTree> | null>(null)
const handleUpdate = () => {
  const checkedKeys = menuTree.value?.getCheckedKeys()
  const params = {
    roleId: props.roleId,
    menuIds: checkedKeys
  }
  updateTreeList(params)
    .then((res) => {
      const result = res.data
      if (result.code === '000000') {
        ElMessage.success('更新菜单资源成功')
        //   保存成功跳转角色页面
        router.push({ name: 'roles' })
      } else {
        ElMessage.error('更新菜单资源失败')
        throw new Error('更新菜单资源失败')
      }
    })
    .catch((err) => {
      ElMessage.error('更新菜单资源失败')
      console.log(err)
    })
}
const handleClear = () => {
  menuTree.value?.setCheckedKeys([])
}
</script>

<style scoped lang="scss"></style>
