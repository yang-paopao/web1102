<template>
  <div>
      <!-- 标签页 navBar -->
    <van-nav-bar  right-text="登录"  @click-right="$router.push('/login')" title="欢迎注册"/>

    
    <van-form @submit="onSubmit">
        <van-field
          v-model="user.phone"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="user.nickname"
          label="昵称"
          placeholder="请输入昵称"
          :rules="[{ required: true, message: '请填写昵称' }]"
        />
        <van-field
          v-model="user.password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { register } from '../utils/request'
export default {
  data(){
    return {
       user:{
          phone:'',
          nickname: '',
          password: '',
       }
    }
  },
  methods:{
     onSubmit() {
      //  发起登录请求
      register(this.user).then(res=>{
        this.$toast.success('注册成功')
        this.$router.push('/login')
       
      })
    },
  }
}
</script>

<style>

</style>
