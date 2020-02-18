<template>
    <el-form :model="loginForm" :rules="filedRules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h2 class="title" style="padding-left: 22px">系统登录</h2>
      <el-form-item>
        <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width:48%" @click.native.prevent="rest">重置</el-button>
        <el-button type="primary" style="width: 48%" @click.native.passive="login" :loading="loading">登录</el-button>
      </el-form-item>
    </el-form>
</template>
<script>
import Cookies from 'js-cookie'
import router from '@/router'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      filedRules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      checked: true
    }
  },
  methods: {
    login () {
      let userInfo = {account: 'admin', password: '123456'}
      this.$api.login.login(userInfo).then(function (res) {
        // alert(res.data.token)
        Cookies.set('token', res.data.token)
        router.push('/') // 登录成功，跳转到主页
      }).catch(function (res) {
        alert(res)
      })
    }
  }
}
</script>
<style lang="scss">
.login-container{
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 100px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  border: 1px solid #eaeaea;
  background: #fff;
  box-shadow: 0 0 25px #cac6c6;
  .title{
    margin: 0px auto 30px auto;
    text-align: center;
    color: #505458;
  }
}
</style>
