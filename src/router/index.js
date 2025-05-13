import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/users/Home.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/users/Home.vue')
  },
  {
    path:'/regist',
    name:'regist',
    component:()=>import('../views/Regist.vue')
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('../views/Login.vue')
  },
  {
    path:'/adoption',
    name:'adoption',
    component:()=>import('../views/users/Adoption.vue')
  },
  {
    path:'/message',
    name:'message',
    component:()=>import('../views/users/message.vue')
  },
  {
    path:'/mine',
    name:'mine',
    component:()=>import('../views/users/mine.vue')
  },
  {
    path:"/addpet",
    name:"addpet",
    component:()=>import('../views/users/Add-givepet.vue')
  },
  {
    path:"/details",
    name:"details",
    component:()=>import('../views/users/details.vue')
  },
  {
    path:"/adminHome",
    name:"adminHome",
    component:()=>import('../views/admin/Home.vue')
  },
  {
    path:"/givedetail",
    name:"givedetail",
    component:()=>import('../views/users/giveDetail.vue')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
