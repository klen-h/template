import { createRouter, createWebHashHistory } from 'vue-router'
import { RouterTy } from '@/types/router'

export const constantRoutes: RouterTy = [
  {
    path: '/redirect/:path(.*)',
    name: 'Redirect',
    component: () => import('@/views/redirect/index'),
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    hidden: true,
  },
  {
    path: '/500',
    component: () => import('@/views/error-page/500.vue'),
    hidden: true,
  },
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '',
      requiresAuth: true,
    },
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/:pathMatch(.*)', redirect: '/404', hidden: true, name: 'PathMatch',
  },
]

export const createAppRouter = () => createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({
    top: 0,
  }),
  routes: constantRoutes,
})
