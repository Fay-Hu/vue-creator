import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    name: 'root',
    component: () => import('@/pages/index/index'),
    children: []
  }
]

export default new Router({
  // mode: 'history',
  routes: constantRouterMap
})
