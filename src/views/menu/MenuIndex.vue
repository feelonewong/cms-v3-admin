<template>
  <div>
    <h1>Menu</h1>
  </div>
</template>
  
<script setup lang='ts'>
import {getAllMenus} from '@/api/menus'
import type { MenuItem } from '@/api/menus'
import { ElMessage } from 'element-plus/lib/components/index.js';
import { ref, onMounted } from 'vue';
onMounted(() => {
  getMenus()
})
const tableData = ref([] as MenuItem[])
const getMenus = async ()=>{
  const {data} = await getAllMenus()
  if(data.code === "000000"){
    tableData.value = data.data
    console.log(data)
  }else {
    ElMessage.error("获取菜单信息失败")
    throw new Error("获取菜单信息失败")
  }
}

</script>
  
<style>
  
</style>