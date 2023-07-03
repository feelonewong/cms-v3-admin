import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import AppLayout from '@/components/layout/AppLayout.vue'
import { useTokenStore } from '@/stores/token'
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
          // @ts-ignore
          component: () => import('@/views/IndexView.vue')
        },
        {
          path: 'menus',
          name: 'menus',
          // @ts-ignore
          component: () => import('@/views/menu/MenuIndex.vue')
        },
        {
          path: '/menus/update',
          name: 'menu-update',
          // @ts-ignore
          component: () => import('@/views/menu/updateMenu.vue')
        },
        {
          path: `/menus/:id/edit`,
          name: 'menu-edit',
          // @ts-ignore
          component: () => import('@/views/menu/updateMenu.vue')
        },
        {
          path: '/resources-category',
          name: 'resource-category',
          // @ts-ignore
          component: () => import('@/views/resourceCategory/resourceCategoryIndex.vue')
        },
        {
          path: '/resources',
          name: 'resources',
          // @ts-ignore
          component: () => import('@/views/resources/resourceIndex.vue')
        },
        {
          path: '/roles',
          name: 'roles',
          // @ts-ignore
          component: () => import('@/views/roles/RolesIndex.vue')
        },
        {
          path: '/roles/:roleId/alloc-menus',
          name: 'alloc-roles',
          // @ts-ignore
          component: () => import('@/views/roles/allocRoles.vue'),
          props: true
        },
        {
          path: '/roles/:roleId/alloc-resource',
          name: 'alloc-resource',
          // @ts-ignore
          component: () => import('@/views/roles/allocResource.vue'),
          props: true
        },
        {
          path: '/user',
          name: 'user',
          // @ts-ignore
          component: () => import('@/views/user/userIndex.vue')
        },
        {
          path: '/course',
          name: 'course',
          // @ts-ignore
          component: () => import('@/views/course/courseIndex.vue')
        },
        {
          path: '/course/create',
          name: 'course-create',
          // @ts-ignore
          component: () => import('@/views/course/components/update-course.vue')
        },
        {
          path: '/course/:courseId/edit',
          name: 'course-edit',
          // @ts-ignore
          component: () => import('@/views/course/components/update-course.vue'),
          props: true
        },
        {
          path: '/course/:courseId/content',
          name: 'course-content',
          // @ts-ignore
          component: () => import('@/views/course/components/course-content.vue'),
          props: true
        },
        {
          path: 'about',
          name: 'about',
          // @ts-ignore
          component: () => import('@/views/AboutView.vue')
        },
        {
          path: '/:pathMatch(.*)',
          name: 'not-found',
          // @ts-ignore
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
