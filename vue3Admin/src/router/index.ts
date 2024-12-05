import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'
import { RouterTy } from '@/types/router'
import { checkNeedErrorLog } from '@/utils/index'
import setting from '@/settings'
import { getAllAuths } from '@/router/filter-nav'
// import {  } from 'vue-router'

export const constantRoutes: RouterTy = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/redirect/index'),
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        redirect: '/home',
      },
      {
        path: '404',
        name: '404',
        meta: {
          title: '404',
        },
        component: () => import('@/views/error-page/404.vue'),
      },
      {
        path: '401',
        name: '401',
        meta: {
          title: '401',
        },
        component: () => import('@/views/error-page/401.vue'),
      },
      {
        path: '500',
        name: '500',
        meta: {
          title: '500',
        },
        component: () => import('@/views/error-page/500.vue'),
      },
    ],
  },
]

/**
 * asyncRoutes 根据角色权限动态添加
 */
export const asyncRoutes: RouterTy = [
  {
    path: '/home',
    name: 'Home',
    component: Layout,
    // alwaysShow: true,
    meta: {
      title: '首页',
      auth: '首页',
      icon: 'dashboard',
    },
    children: [
      {
        path: '',
        name: 'HomeIndex',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页', icon: 'dashboard',
        },
      },
    ],
  },
  // 表格 DEMO
  {
    path: '/base-table-demo',
    component: Layout,
    redirect: '/base-table-demo/index',
    alwaysShow: true,
    meta: {
      title: '基础表格',
      auth: 'BaseTable Demo',
      icon: 'table',
    },
    children: [
      {
        path: 'index',
        name: 'BaseTableDemoBase',
        component: () => import('@/views/base-table-demo/index.vue'),
        meta: {
          title: '基础用法',
        },
      },
    ],
  },
  // 表单 DEMO
  {
    path: '/base-form-demo',
    component: Layout,
    redirect: '/base-form-demo/index',
    meta: {
      title: '基础表单',
      auth: 'BaseForm Demo',
      icon: 'form',
    },
    children: [
      {
        path: 'index',
        name: 'BaseFormDemoBase',
        component: () => import('@/views/base-form-demo/index.vue'),
        meta: {
          title: '基础表单',
          icon: 'form',
        },
      },

    ],
  },
  ...(checkNeedErrorLog(setting)
    ? [
      {
        path: '/error-log',
        component: Layout,
        children: [
          {
            path: 'log',
            component: () => import('@/views/error-log/index.vue'),
            name: 'ErrorLog',
            meta: {
              title: '错误日志', icon: 'bug',
            },
          },
        ],
      },
    ]
    : []),
  {
    path: '/:pathMatch(.*)', redirect: '/404', hidden: true, name: 'PathMatch',
  },
]

export const allAuths = getAllAuths(asyncRoutes)
const childFilterRotePaths = ['/404', '/401', '/500', '/', '/:pathMatch(.*)', '/redirect']

/**
 * 子应用模式的路由
 */
export const childAppRoutes = [...constantRoutes, ...asyncRoutes]
  .filter((item) => !childFilterRotePaths.includes(item.path))
  .map((item) => ({
    ...item,
    path: `${setting.childAppName}${item.path}`,
    redirect: item.redirect ? `${setting.childAppName}${item.redirect}` : undefined,
  }))
console.log('childAppRoutes: ', childAppRoutes)

export const createAppRouter = (isChildAppMode: boolean) => {
  console.log(isChildAppMode, isChildAppMode ? childAppRoutes : constantRoutes)
  return createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({
      top: 0,
    }),
    routes: (isChildAppMode ? childAppRoutes : constantRoutes) as RouterTy,
  })
}
