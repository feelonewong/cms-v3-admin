import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import AppLayout from '@/components/layout/AppLayout.vue'
import { useTokenStore } from '@/stores/token'
// @ts-ignore
// @ts-ignore
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      // @ts-ignore
      component: () => import('@/views/Login/login.vue')
    },
    {
      path: '/',
      name: 'home',
      component: AppLayout,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/IndexView.vue')
        },
        {
          path: 'menus',
          name: 'menus',
          component: () => import('@/views/menu/MenuIndex.vue')
        },
        {
          path: '/menus/update',
          name: 'menu-update',
          component: () => import('@/views/menu/updateMenu.vue')
        },
        {
          path: `/menus/:id/edit`,
          name: 'menu-edit',
          component: () => import('@/views/menu/updateMenu.vue')
        },
        {
          path: '/resources-category',
          name: 'resource-category',
          component: () => import('@/views/resourceCategory/resourceCategoryIndex.vue')
        },
        {
          path: '/resources',
          name: 'resources',
          component: () => import('@/views/resources/resourceIndex.vue')
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('@/views/AboutView.vue')
        },
        {
          path: '/:pathMatch(.*)',
          name: 'not-found',
          component: () => import('@/views/ErrorPage.vue')
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some((r) => r.meta?.requiresAuth)) {
    const store = useTokenStore()
    if (!store.token.access_token) {
      next({ name: 'login', query: { redirect: to.fullPath } })
    }
  }
  next()
  return
})
export default router
