import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//布局组件
const index = ()=>import('../pages/index')

// 页面组件
const login = ()=>import('../pages/login')
const register = ()=>import('../pages/register')
const home = ()=>import('../pages/home')
const cate = ()=>import('../pages/cate')
const cart = ()=>import('../pages/cart')
const goodsList = ()=>import('../pages/goodsList')
const mime = ()=>import('../pages/mime')

export default new Router({
  routes: [
    {
      path:'/',
      component:index,
      redirect:'/home',
      children:[
        {
          path:'home',
          component:home
        },
        {
          path:'cate',
          component:cate
        },
        {
          path:'cart',
          component:cart
        },
        {
          path:'mime',
          component:mime
        },
      ]
    },
    {
      path:'/login',
      component:login,
    },
    {
      path:'/register',
      component:register,
    },
    {
      path:'/goodsList',
      component:goodsList,
    },
    {
      path:'*',
      redirect:'/login',
    }
  ]
})
