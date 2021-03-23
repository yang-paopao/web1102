<template>
  <div>
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <van-tabbar v-model="active" route active-color="orange">
  <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
  <van-tabbar-item icon="search" to="/cate">分类</van-tabbar-item>
  <van-tabbar-item icon="friends-o" to="/cart" :badge="total">购物车</van-tabbar-item>
  <van-tabbar-item icon="setting-o" to="/mime">我的</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  data(){
    return {
      active:0,
    }
  },
  computed:{
    ...mapGetters({
      "user":"user",
      "total":"total"
    })
  },
  methods:{
    ...mapActions({
      "requestCart":"cartListActions"
    })
  },
  mounted(){
    if(this.user){
      this.requestCart(this.user.uid)
    }
  }
}
</script>

<style>

</style>
