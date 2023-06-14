import { ref, computed } from 'vue'
import type { MenuItem } from '@/api/menus'
import { getAllMenus } from '@/api/menus'
import { ElMessage } from 'element-plus/lib/components/index.js'

export function useMenu() {
  const allMenus = ref([] as MenuItem[])

  const getMenus = async () => {
    const { data } = await getAllMenus()
    if (data.code === '000000') {
      allMenus.value = data.data
    } else {
      ElMessage.error('获取菜单信息失败')
      throw new Error('获取菜单信息失败')
    }
  }
  const topMenus = computed(() => {
    return allMenus.value.filter((item) => item.level === 0)
  })
  return { allMenus, getMenus, topMenus }
}
