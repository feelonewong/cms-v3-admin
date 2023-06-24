<template>
  <div>
    <alloc-category
      v-for="(category, index) in resourceList"
      :key="index"
      :category="category"
    ></alloc-category>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getRoleResources } from '@/api/roles'
import AllocCategory from '@/views/roles/components/alloc-category.vue'
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
    const result = res.data
    if (result.code === '000000') {
      resourceList.value = result.data
    }
  })
}
</script>

<style lang="scss" scoped></style>
