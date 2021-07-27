import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase/app";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      meta: {layout: 'main', auth: true},
      name: "Home",
      component: () => import('@/views/Home')
    },
    {
      path: "/login",
      meta: {layout: 'empty'},
      name: "Login",
      component: () => import('@/views/Login')
    },
    {
      path: "/register",
      meta: {layout: 'empty'},
      name: "Register",
      component: () => import('@/views/Register')
    },
    {
      path: "/new",
      meta: {layout: 'main', auth: true},
      name: "NewElement",
      component: () => import('@/views/NewElement')
    },
    {
      path: "/edit/:id",
      meta: {layout: 'main', auth: true},
      name: "EditElement",
      component: () => import('@/views/EditElement')
    },
    {
      path: "/detail/:id",
      name: "detail",
      meta: {layout: "main", auth: true},
      component: () => import('../views/Detail.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router;
