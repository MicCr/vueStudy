import Vue from 'vue'
import VueRouter from 'vue-router'
// import viewsLazyload from '../common/js/router.js'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/calculator',
    component: () => import('../views/index')
    // component: viewsLazyload('index')
  },
  {
    path: '/calculator',
    name: '固定金额复利',
    redirect: '/calculator/fixedAmount',
    component: () => import('../views/index'),
    children: [
      {
        path: '/calculator/fixedAmount',
        component: () => import('../components/calculator/fixedAmount')
      },
      {
        path: '/calculator/monthBenefit',
        component: () => import('../components/HelloWorld')
      }
    ]
  },
  {
    path: '/benefitTable',
    name: '复利表',
    component: () => import('../views/index'),
    children: [
      {
        path: '/benefitTable/tableByYear',
        component: () => import('../components/HelloWorld')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: 'index',
  // base: process.env.BASE_URL,
  routes
})

export default router
