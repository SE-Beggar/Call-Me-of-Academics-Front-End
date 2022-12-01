import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },{
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },{
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },{
    path: '/paperdetail',
    name: 'paperdetail',
    component: () => import('../views/Paperdetail.vue')
  },{
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue')
  },{
    path: '/scholar',
    name: 'scholar',
    component: () => import('../views/Scholar.vue')
  },{
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue')
  },{
    path: '/searchPaper',
    name: 'SearchPaper',
    component: () => import('../views/SearchPaper.vue')
  },{
    path: '/searchAuthor',
    name: 'SearchAuthor',
    component: () => import('../views/SearchAuthor.vue')
  },{
    path: '/testpage',
    name: 'testpage',
    component: () => import('../views/Testpage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router