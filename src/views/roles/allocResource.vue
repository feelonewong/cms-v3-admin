<template>
  <div>分配资源</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const props = defineProps({
  roleId: {
    type: String,
    required: true
  }
})
onMounted(() => {
  console.log(props.roleId)
})
</script>

<style lang="scss" scoped></style>
