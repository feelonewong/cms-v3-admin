<template>
  <div>
    <div slot="header" class="clearfix">
      <el-button class="add-btn">添加菜单</el-button>
      <el-table :data="tableData" style="width: 100%" border :height="750">
        <el-table-column v-for="(item, index) in tableConfig" :align="item.align" :width="item.width" :key="index"
          :type="item.type" :label="item.label" :prop="item.prop"></el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button type="primary" size="mini">编辑</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import { getAllMenus } from '@/api/menus'
import type { MenuItem } from '@/api/menus'
import { ElMessage } from 'element-plus/lib/components/index.js';
import { ref, onMounted } from 'vue';
onMounted(() => {
  getMenus()
})
const tableData = ref([] as MenuItem[])
const tableConfig = ref([{
  label: '编号',
  prop: '',
  width: '100',
  align: 'center',
  type: 'index'
}, {
  label: '菜单名称',
  align: 'center',
  prop: 'name'
}, {
  label: '菜单级数',
  align: 'center',
  prop: 'level'
}, {
  label: '菜单图标',
  align: 'center',
  prop: 'icon'
}, {
  label: '排序',
  align: 'center',
  prop: 'orderNum'
}
])
const getMenus = async () => {
  const { data } = await getAllMenus()
  if (data.code === "000000") {
    tableData.value = data.data
  } else {
    ElMessage.error("获取菜单信息失败")
    throw new Error("获取菜单信息失败")
  }
}

</script>
  
<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: auto;
}

.add-btn {
  margin-bottom: 10px;
}
</style>