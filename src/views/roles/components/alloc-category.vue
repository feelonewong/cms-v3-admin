<template>
  <div>
    <el-card class="box-card" shadow="always">
      <template #header>
        <div class="card-header">
          <span>
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
              >{{ props.category.name }}</el-checkbox
            >
          </span>
        </div>
      </template>
      <el-checkbox-group v-model="checkedIds" @change="handleCheckedCitiesChange">
        <el-row type="flex" :span="24">
          <el-col v-for="(item, index) in allItemIds" :key="index" :span="6">
            <el-checkbox :label="item.id">
              {{ item.name }}
            </el-checkbox>
          </el-col>
        </el-row>
      </el-checkbox-group>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue'
import type { CheckboxValueType } from 'element-plus'
const props = defineProps({
  category: Object
})
onMounted(() => {
  allItemIds.value = props.category.resourceList
  checkedIds.value = props.category.resourceList
    .filter((item) => item.selected)
    .map((item) => item.id)
  isIndeterminate.value =
    checkedIds.value.length > 0 && checkedIds.value.length < allItemIds.value.length
})
const checkAll = ref(props.category.selected)
const checkedIds = ref<any>([])
const allItemIds = ref([])
const isIndeterminate = ref(false)
const emit = defineEmits<{
  (e: 'postCheckedIdsRef', payload: Ref<number[]>): void
}>()

emit('postCheckedIdsRef', checkedIds)
const handleCheckAllChange = (checkedItems: CheckboxValueType) => {
  let tempAllItemIds = []
  tempAllItemIds = allItemIds.value.map((item) => item.id)
  checkedIds.value = checkedItems ? tempAllItemIds : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === allItemIds.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < allItemIds.value.length
}
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: auto;
  margin-bottom: 20px;
  margin-right: 20px;
}
</style>
