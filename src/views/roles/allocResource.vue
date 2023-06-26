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
import { getRoleResources, allocRoleResources } from '@/api/roles'
import AllocCategory from '@/views/roles/components/alloc-category.vue'
import { Ref } from 'vue/dist/vue'
import ElMessage from 'element-plus/lib/components/message/index.js'
import { useRouter } from 'vue-router'
const props = defineProps({
  roleId: {
    type: String,
    required: true
  }
})
const router = useRouter()
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
  const id = props.roleId
  const checkedIds = allCheckedIds
  allocRoleResources(id, checkedIds).then((res) => {
    const result = res.data
    if (result.code === '000000') {
      ElMessage.success('更新成功')
      router.push({ name: 'roles' })
    } else {
      ElMessage.error('更新角色失败')
      throw new Error('更新角色失败')
    }
  })
}
const handleClear = () => {
  collectionCheckIds.forEach((item: any) => {
    item.value = []
  })
}
const collectionCheckIds = [] as Ref<number[]>
const handleCheckedIdsRef = (playload: Ref<number[]>) => {
  collectionCheckIds.push(playload)
}
</script>

<style lang="scss" scoped></style>
