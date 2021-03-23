<template>
  <div>
    <!-- 标签页 navBar -->
    <van-nav-bar   left-arrow  @click-left="$router.go(-1)" title="商品列表"/>
<!-- 商品列表 -->
<div v-if='goodslist !== null'>
<van-card
v-for="(item) in goodslist"
:key='item.id'
  
  :price="item.price"
  
  :title="item.goodsname"
  :thumb="$preImg+item.img"
>
  
  <template #footer>
    <van-button size="small" icon="cart-o" type="primary"></van-button>
    
  </template>
</van-card>
</div>
<!-- 没有内容显示空状态 -->
<van-empty
 v-else
  class="custom-image"
  image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
  description="描述文字"
/>
  </div>
</template>

<script>
import {getGoodslist} from '../utils/request'
export default {
  data(){
    return{
      goodslist:[]
    }
  },
mounted(){
  this.getlist()
},
methods:{
  getlist(){
    // 获取get路由传递过来的ID
    const fid = this.$route.query.fid
getGoodslist({fid}).then(res=>{
this.goodslist= res.data.list
})
  }
}
}
</script>

<style scoped>
.custom-image .van-empty__image {
    width: 90px;
    height: 90px;
  }
</style>
