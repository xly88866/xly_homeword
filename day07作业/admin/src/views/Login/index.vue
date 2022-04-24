<template>
    <div class="box">
        <div class="box1">
            <h3>电商管理后台</h3>
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="iconfont icon-user-fill"
            v-model="loginForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            show-password
            type="password"
            prefix-icon="iconfont icon-password"
            v-model="loginForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item class="login_form_btns">
          <el-button type="primary" @click="goLogin">登录</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
        </div>
    </div>
</template>

<script>
import { LoginApi } from '../../http/api.js'
export default {
  data() {
    return {
      //表单绑定的数据
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      //表单验证规则
      loginFormRules: {
        username: [
          //判空处理
          { required: true, message: '请输入用户名', trigger: 'blur' },
          //字符长度处理
          {
            min: 5,
            max: 20,
            message: '输入的用户长度必需要5~20位之间',
            trigger: 'blur'
          }
        ],
        password: [
          //判空处理
          { required: true, message: '请输入密码', trigger: 'blur' },
          //字符长度处理
          {
            min: 5,
            max: 20,
            message: '输入的密码长度必需要5~20位之间',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    //登录
    goLogin() {
      console.log('login')
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return false
        //开始调用后台登录接口
        const res = await LoginApi(this.loginForm)
        console.log('是否登录成功：', res)
        this.$router.push('/home')
      })
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped >
.box {
  width: 100%;
  height: 100%;
  background-color: rgb(23, 72, 206);
  .box1 {
    width: 30%;
    height: 300px;
    min-width: 400px;
    position: absolute;
    background-color: #fff;
    box-sizing: border-box;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    padding: 10px 30px;
    .el-input {
      margin: 0px 30px;
    }
  }
}
</style>
