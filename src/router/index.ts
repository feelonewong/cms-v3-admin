import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import { useTokenStore } from '@/stores/token'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
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
          path: 'about',
          name: 'about',
          component: () => import('@/views/AboutView.vue')
        },
        {
          path: '/:pathMatch(.*)*',
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
