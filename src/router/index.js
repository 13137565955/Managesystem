import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
  path: '',
  redirect: '/login',
  }, 
  {
  path: '/login',
  meta: {
      title: '登录页面'
    },
  component: () => import('../views/login/login')
  },
  {
  path: '/home',
  meta: {
      title: '首页'
    },
  component: () => import('../views/home/home')
  }
]

const router = new VueRouter({
  routes
})
//标题 全局守卫
router.beforeEach((to, from, next) => {
  // 从from跳转到to
  document.title = to.matched[0].meta.title;
  // to将要访问的路径
  // from 代表从哪个路径跳转而来 
  // next 是一个函数，表示放行
  // next()放行 next( ' /login ')强制跳转
  if(to.path === "/login") return next()
  //获取tokenI
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next("/login")
    next()
})
export default router