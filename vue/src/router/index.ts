import AddNew from '@/components/AddNew.vue'
import AllItems from '@/components/AllItems.vue'
import Dashboard from '@/components/Dashboard.vue'
import Login from '@/components/Login.vue'
import MyItems from '@/components/MyItems.vue'
import PageNotFound from '@/components/PageNotFound.vue'
import Register from '@/components/Register.vue'
import Update from '@/components/Update.vue'
import DefaultLayout from '@/views/DefaultLayout.vue'
import GuestLayout from '@/views/GuestLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      meta: { requiresAuth: true },
      component: DefaultLayout,
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: Dashboard,
          children: [
            {
              path: '/my-items',
              name: 'MyItems',
              component: MyItems
            },
            {
              path: '/all-items',
              name: 'AllItems',
              component: AllItems
            },
            {
              path: '/update',
              name: 'Update',
              component: Update
            },
            {
              path: '/add-new',
              name: 'AddNew',
              component: AddNew
            }
          ]
        }
      ]
    },
    {
      path: '/',
      redirect: '/login',
      meta: { isGuest: true },
      component: GuestLayout,
      children: [
        {
          path: '/login',
          name: 'Login',
          component: Login
        },
        {
          path: '/register',
          name: 'Register',
          component: Register
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    next('/login')
  } else if (to.meta.isGuest && localStorage.getItem('token')) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
