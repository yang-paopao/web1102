import Vue from 'vue'
import Router from 'vue-router'
import {Toast} from 'vant'
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

const router = new Router({
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
// 做全局路由守卫
router.beforeEach((to,form,next)=>{
  if(to.path == '/mime' || to.path == '/cart'){
    // 获取用户信息
    const user = JSON.parse(sessionStorage.getItem('user'))
    if(!user){
      // 消息提示
      Toast.fail('请登录');
      // 去到登录页面
      router.push('/login')
      return
    }
  }
  next();
})


export default router