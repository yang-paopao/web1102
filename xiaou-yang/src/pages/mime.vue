<template>
  <div>
    <!-- 标签页 navBar -->
    <van-nav-bar left-arrow @click-left="$router.go(-1)"  title="会员中心"/>
    <div class="header">
        <van-image
            round
            width="10rem"
            height="10rem"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
         <div>{{user.nickname}}</div>
    </div>
    <van-button type="danger" block @click="logout">安全退出</van-button>
    <div class="main">
      <van-cell title="我的收藏" is-link />
      <van-cell title="我的评论" is-link />
      <van-cell title="我的订单" is-link />
    </div>

  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  computed:{
   ...mapGetters({
      "user":"user"
    })
  },
  methods:{
    ...mapActions({
      "requestUser":"userActions"
    }),
    logout(){
      // 1.将用户信息清空
      this.requestUser(null)
      // 2.退出成功消息提示
      this.$toast.success('退出成功')
      // 3.跳转页面
      this.$router.push('/login')
      console.log(this);
    }
  }
}
</script>

<style scoped>
.header{
  height: 250px;
  background: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom:10px;
}
.van-button{
  border-radius: 20px;
}
</style>
