<template>
  <div>

<!-- 标签页 navBar -->
    <van-nav-bar   left-arrow  @click-left="$router.go(-1)" title="分类"/>

<!-- 获取左侧列表 -->
<van-sidebar v-model="activeKey">
  <van-sidebar-item :title="item.catename" v-for="(item,index) in catetreelist" :key='item.id' @click="change(index)" />
</van-sidebar>


<!-- 获取右侧商品列表 -->
<div class="main" >
<van-grid :border="false" :column-num="3">

                                             <!-- 实现路由跳转并传参 -->
  <van-grid-item v-for="item in twocatetreelist" :key='item.id' :to="`/goodsList?fid=${item.id}`">
    <van-image :src="$preImg+item.img" />
  </van-grid-item>
 
</van-grid></div>


  </div>
</template>

<script>
import {getcateGoods} from '../utils/request'
export default {
data() {
    return {
      activeKey: 0,
      catetreelist:[],
      twocatetreelist:[]
    };
  },
  mounted(){
    this.getcatetree()
   
  },
  methods:{
    change(index){
this.twocatetreelist= this.catetreelist[index].children
    },
    getcatetree(){
      getcateGoods().then(res=>{
this.catetreelist= res.data.list
this.change(0)
      })
    }
  }
}
</script>

<style scoped>
.main{
  width: 326px;
  position: relative;
  right: -83px;
  top: -300px;
}
</style>
