<template>
  <div>分配资源</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getRoleResources } from '@/api/roles'
const props = defineProps({
  roleId: {
    type: String,
    required: true
  }
})
onMounted(() => {
  getResource()
})
const resourceList = ref({})
const getResource = () => {
  getRoleResources(props.roleId).then((res) => {
    console.log(res)
    const result = res.data
    if (result.code === '000000') {
      resourceList.value = result.data
    }
  })
}
</script>

<style lang="scss" scoped></style>
