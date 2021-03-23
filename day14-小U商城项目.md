# 小U商城项目

## 1.项目搭建

```
1.vue init webpack umall  创建项目
2.cnpm i   安装依赖项
3.cnpm i axios qs vant vuex --save  安装依赖项
```

## 2.项目清空工作

```
assets		目录清空
components   目录清空
router/index.js  有关helloWord删除
App.vue      根组件只留模板
main.js		唯一入口文件
```

## 3.页面布局

```
一级路由出口
	login register index goodsList
二级路由出口
	home cate cart mime
```

路由规格配置:

```js
router/index.js
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

```

## 4.引入vant组件

```js
main.js
// 引入vant组件
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
```

## 5.index.vue(布局组件)

```vue
<template>
  <div>
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <van-tabbar v-model="active" active-color="orange">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data(){
    return {
      active:0,
    }
  }
}
</script>

<style>

</style>

```

## 6.home.vue(页面布局)

```vue
<template>
  <div>
    <!-- 标签页 navBar -->
    <van-nav-bar  title="首页"/>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <van-tabs v-model="active">
      <van-tab title="热门推荐">
        <van-card
            v-for="item in 10"
            :key="item"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
          >
            <template #footer>
              <van-button type="primary" size="small" icon="cart-o"></van-button>
            </template>
          </van-card>
      </van-tab>
      <van-tab title="发现新品">内容 2</van-tab>
      <van-tab title="全部商品">内容 3</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data(){
    return {
      active:0,
    }
  }
}
</script>

<style scoped>
.van-tab__pane{
  margin-bottom:50px;
}
 .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
</style>

```

## 7.后端服务配置

```js
1.新建数据库 shop1103
2.将数据的sql文件导库中
3.打开shop_admin 修改数据库配置文件
	// 数据库连接参数
        exports.dbConfig = {
            host: 'localhost', //数据库地址
            user: 'root',//数据库用户名
            password: '123456',//数据库用户密码
            port: 3306,
            database: 'shop1103' // 数据库名字
        }
4.npm i
5.npm start
```

## 8.修改umall配置代理

```js
config/index.js
  proxyTable: {
      "/api":{
        target:"http://localhost:3000",
        changeOrigin:true,
        pathRewrite:{
          "^/api":"http://localhost:3000"
        }
      }
    },
```

## 9.在utils/request.js中做基本配置

```js
import axios from 'axios'
import qs from 'qs'
import {Toast} from 'vant'

// 配置基础路径
const baseUrl = "/api";

// 设置响应拦截
axios.interceptors.response.use(res=>{
  console.group('本次响应路径为:'+res.config.url)
  if(res.data.code !== 200){
    // 提示错误信息
    Toast.fail(res.data.msg);
    return;
  }
  console.log(res);
  return res;
})
```

## 10.home.vue(获取数据)

```vue
<template>
  <div>
    <!-- 标签页 navBar -->
    <van-nav-bar  title="首页"/>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in bannerList" :key="item.id">
        <img :src="$preImg+item.img" alt="">
      </van-swipe-item>
    </van-swipe>
    <van-tabs v-model="active">
      <van-tab title="热门推荐">
        <van-card
            v-for="item in goodsList[0].content"
            :key="item.id"
            tag="hot"
            :price="item.price"
            :title="item.goodsname"
            :thumb="$preImg+item.img"
          >
            <template #footer>
              <van-button type="primary" size="small" icon="cart-o"></van-button>
            </template>
          </van-card>
      </van-tab>
      <van-tab title="发现新品">
        <van-card
            v-for="item in goodsList[1].content"
            :key="item.id"
            tag="new"
            :price="item.price"
            :title="item.goodsname"
            :thumb="$preImg+item.img"
          >
            <template #footer>
              <van-button type="primary" size="small" icon="cart-o"></van-button>
            </template>
          </van-card>
      </van-tab>
      <van-tab title="全部商品">
        <van-card
            v-for="item in goodsList[2].content"
            :key="item.id"
            :price="item.price"
            :title="item.goodsname"
            :thumb="$preImg+item.img"
          >
            <template #footer>
              <van-button type="primary" size="small" icon="cart-o"></van-button>
            </template>
          </van-card>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {getBanner, getIndexGoods} from '../utils/request'
export default {
  data(){
    return {
      active:0,
      bannerList:[],
      goodsList:[{content:[]},{content:[]},{content:[]}]
    }
  },
  methods:{
    requestBanner(){
      // 发起获取轮播图请求
      getBanner().then(res=>{
        this.bannerList = res.data.list
      })
    },
    requestGoodsList(){
      getIndexGoods().then(res=>{
        this.goodsList = res.data.list
      })
    }
  },
  mounted(){
    // 1.发起轮播图请求
    this.requestBanner()
    // 2.发起获取商品信息请求
    this.requestGoodsList()
  }
}
</script>

<style scoped>
.van-tab__pane{
  margin-bottom:50px;
}
 .my-swipe .van-swipe-item img{
   width:100%;
   height: 100%;
  }
</style>

```

request/index.js

```js
// 发起轮播图请求
export const getBanner = ()=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/getbanner',
  })
}

// 发起获取首页商品信息
export const getIndexGoods = ()=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/getindexgoods'
  })
}

```

