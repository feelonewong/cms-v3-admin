<template>
  <div>更新</div>
</template>
  
<script setup lang='ts'>
import { useMenu } from '@/composables/useMenu'
import { onMounted } from 'vue'
onMounted(async () => {
  await getMenus()
  console.log(topMenus, 'topMenus')
})
const { getMenus, topMenus } = useMenu();
</script>
  
<style></style>