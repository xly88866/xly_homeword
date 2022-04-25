<template>
    <div class="box">
        <el-container>
  <el-header>
       <h2>电商管理系统</h2>
       <el-button @click="tui">退出学习</el-button>
  </el-header>
  <el-container>
    <el-aside :width="islock?'65px':'200px'">
        <div class="box1" @click="islock=!islock">|||</div>
         <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
      unique-opened
      :collapse="islock"
      :collapse-transition="true"
      >
      <el-submenu :index="index+'1'" v-for="(item,index) in Tab" :key="index">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.authName}}</span>
        </template>
        <el-menu-item :index="ite.path" v-for="(ite,ind) in item.children" :key="ind">
        <i class="el-icon-menu"></i>
        <span slot="title">{{ite.authName}}</span>
      </el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>

    <el-main><router-view></router-view></el-main>
  </el-container>
</el-container>
    </div>
</template>

<script>
import { Homelist } from '../../http/api.js'
export default {
  data() {
    return {
      Tab: [],
      islock: false
    }
  },
  created() {},
  mounted() {
    this.gitlist()
  },
  methods: {
    async gitlist() {
      const res = await Homelist()
      console.log(res)
      this.Tab = res
    },
    tui() {
      sessionStorage.removeItem('token')
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  display: flex;
  justify-content: space-between;
}
.el-menu {
  border-right: 0;
}
.el-aside {
  background-color: #545c64;
  color: #333;
  line-height: 20px;
}
.box1 {
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

.el-container {
  height: 100%;
}
</style>
