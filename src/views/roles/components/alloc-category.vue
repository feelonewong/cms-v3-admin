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
              >Check all</el-checkbox
            >
          </span>
        </div>
      </template>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-row type="flex" :span="24">
          <el-col v-for="city in cities" :key="city" :span="6">
            <el-checkbox :label="city">
              {{ city }}
            </el-checkbox>
          </el-col>
        </el-row>
      </el-checkbox-group>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedCities = ref(['Shanghai', 'Beijing'])
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen', 'NanTong']

const handleCheckAllChange = (val: boolean) => {
  checkedCities.value = val ? cities : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cities.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length
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
}
</style>
