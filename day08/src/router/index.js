import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../../src/views/login/login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../../src/views/home/home.vue'),
    redirect:"/holle",
    children: [
      {
        path: '/holle',
        name: 'holle',
        component: () => import('../views/home/holle.vue')
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('../views/home/users.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.path === '/login') {
    next()
  } else {
    const token = sessionStorage.getItem('token')
    console.log('token', token)
    if (token === '' && token == null) {
      next('/login')
    } else {
      next()
    }
  }
})
export default router
