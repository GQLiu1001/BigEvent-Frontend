import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    /*{
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    },*/
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
      {
      path: '/register',
      name: 'register',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/layout',
      component: () => import('../views/Layout.vue'),
      //重定向
      redirect: '/article/hello',
      children: [
        {
          path: '/article/category',
          component: () => import('../views/ArticleCategory.vue')
        },
        {
          path: '/article/manage',
          component: () => import('../views/ArticleManage.vue')
        },
        {
          path: '/user/info',
          component: () => import('../views/UserInfo.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('../views/UserAvatar.vue')
        },
        {
          path: '/user/resetPassword',
          component: () => import('../views/UserResetPassword.vue')
        },
          {
            path: '/article/hello',
            component: () => import('../views/Hello.vue')
          }
      ]
    }
  ],
})

export default router
