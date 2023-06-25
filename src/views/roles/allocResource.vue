<template>
  <div>
    <alloc-category
      v-for="(category, index) in resourceList"
      :key="index"
      :category="category"
      @postCheckedIdsRef="handleCheckedIdsRef"
    ></alloc-category>
    <el-row type="flex" justify="center">
      <el-button type="primary" @click="handleUpdate">更新</el-button>
      <el-button type="info" @click="handleClear">清空</el-button>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getRoleResources } from '@/api/roles'
import AllocCategory from '@/views/roles/components/alloc-category.vue'
import { Ref } from 'vue/dist/vue'
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
const handleUpdate = () => {
  const allCheckedIds = collectionCheckIds.reduce((tmp: number[], item) => {
    return [...tmp, ...item.value]
  }, [])
  console.log(allCheckedIds)
}
const handleClear = () => {
  console.log(resourceList.value)
}
const collectionCheckIds = [] as Ref<number[]>
const handleCheckedIdsRef = (playload: Ref<number[]>) => {
  collectionCheckIds.push(playload)
}
</script>

<style lang="scss" scoped></style>
