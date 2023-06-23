<template>
  <div>
    <h2>分配菜单</h2>
    <el-tree
      :props="treeProps"
      :default-checked-keys="defaultCheckedKeys"
      :data="menuList"
      node-key="id"
      default-expand-all
      show-checkbox
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { allocRoleList } from '@/api/roles'
import type { RoleMenuItem } from '@/api/roles'
import ElMessage from 'element-plus/lib/components/message/index.js'
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
</script>

<style scoped lang="scss"></style>
