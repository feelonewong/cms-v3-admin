<template>
  <div>
    <h2>分配菜单</h2>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
const props = defineProps({
  roleId: {
    type: String,
    required: true
  }
})
onMounted(() => {
  console.log(props.roleId)
})
const getAlloMenu = (id: number) => {}
</script>

<style scoped lang="scss"></style>
