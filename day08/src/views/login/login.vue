<template>
    <div class="box">
        <div class="box1">
            <h3>电商管理后台</h3>
            <el-form :model="login_from" ref="login" :rules="rules">
                <el-form-item prop="username">
                    <el-input prefix-icon="el-icon-user-solid" v-model="login_from.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input prefix-icon="el-icon-star-off" v-model="login_from.password"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="gologin">登录</el-button>
                    <el-button type="info">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { Login } from '../../http/api.js'
export default {
  data() {
    return {
      login_from: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 7, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    gologin() {
      this.$refs.login.validate(async (vald) => {
        if (!vald) return false
        const res = await Login(this.login_from)
        console.log(res)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="scss" scoped >
.box {
  width: 100%;
  height: 100%;
  background-color: rgb(98, 107, 235);
  .box1 {
    width: 40%;
    height: 300px;
    background-color: white;
    padding: 10px 30px;
    box-shadow: 2px 2px 2px 2px #fff;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
