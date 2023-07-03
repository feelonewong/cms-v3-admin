<template>
  <div>
    <el-page-header @back="goBack">
      <template #content>
        <span class="text-large font-600 mr-3">{{ route.query.courseName }}</span>
      </template>
      <template #extra>
        <el-button type="primary">保存</el-button>
      </template>
    </el-page-header>
    <el-card class="box-card"> </el-card>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
const route = useRoute()
const router = useRouter()
const props = defineProps({
  courseName: String
})
onMounted(() => {})
const goBack = () => {
  router.go(-1)
}
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 20px;
}
</style>
