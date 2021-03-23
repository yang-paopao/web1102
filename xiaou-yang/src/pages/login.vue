<template>
  <div>
    <!-- 标签页 navBar -->
    <van-nav-bar  right-text="注册"  @click-right="$router.push('/register')" title="欢迎登录"/>
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.phone"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="user.password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '../utils/request';
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      user:{
        phone: '18811112222',
        password: '3',
      }
    };
  },
  methods: {
    ...mapActions({
      "requestUser":"userActions"
    }),
    onSubmit() {
      // 发起登录请求
      login(this.user).then(res=>{
        
        // 1.将用户信息存入到vuex和sessionStorage中
        this.requestUser(res.data.list)
        // 2登录成功之后的提示信息
        this.$toast.success(res.data.msg)
        // 3.页面跳转
        this.$router.push('/mime')
      })
    },
  },
};
</script>

<style>

</style>
