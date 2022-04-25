<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-input placeholder="请输入内容" clearable v-model="keyword1" class="input-with-select">
                <el-button slot="append" @click="keyword" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="prmary" @click="dialogVisible=true">添加</el-button>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="index" label="#" width="180">
                </el-table-column>
                <el-table-column prop="username" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="email" label="邮箱">
                </el-table-column>
                <el-table-column prop="mobile" label="电话">
                </el-table-column>
                <el-table-column prop="address" label="状态">
                </el-table-column>
                <el-table-column prop="address" label="操作">
                    <template slot-scope="scope">
                            <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
                            <el-button size="mini" type="primary" @click="emit(scope.row)">编辑</el-button>
                            <el-button size="mini" type="warning">权限分配</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog
            title="添加用户"
            :visible.sync="dialogVisible"
            width="30%">
                <span>
                    <el-form :model="user_from" ref="user" :rules="rules">
                <el-form-item prop="username" label="用户名">
                    <el-input v-model="user_from.username"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input v-model="user_from.password"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="邮箱">
                    <el-input v-model="user_from.email"></el-input>
                </el-form-item>
                <el-form-item prop="mobile" label="手机号">
                    <el-input v-model="user_from.mobile"></el-input>
                </el-form-item>
            </el-form>
                </span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取消</el-button>
                  <el-button type="primary" @click="add_list()">确 定</el-button>
                </span>
        </el-dialog>

            <el-dialog
            title="修改用户"
            :visible.sync="dialogVisibles"
            width="30%">
                <span>
                    <el-form :model="emit_from" ref="user" :rules="rules">
                <el-form-item prop="username" label="用户名">
                    <el-input v-model="emit_from.username"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="邮箱">
                    <el-input v-model="emit_from.email"></el-input>
                </el-form-item>
                <el-form-item prop="mobile" label="手机号">
                    <el-input v-model="emit_from.mobile"></el-input>
                </el-form-item>
            </el-form>
                </span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibles = false">取消</el-button>
                  <el-button type="primary" @click="emit_list()">确 定</el-button>
                </span>
        </el-dialog>
        </el-card>

         <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="userQuery.pagenum"
      :page-sizes="[2, 4, 10, 15]"
      :page-size="userQuery.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
</template>

<script>
import { userlist, userDel, userAdd, userEmit } from '../../http/api.js'
export default {
  data() {
    return {
      userQuery: {
        pagenum: 1,
        pagesize: 2,
        query: ''
      },
      keyword1: '',
      total: 0,
      id: 0,
      tableData: [],
      dialogVisible: false,
      dialogVisibles: false,
      user_from: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      emit_from: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 7, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.gitlist()
  },
  mounted() {},
  methods: {
    emit(item) {
      this.dialogVisibles = true
      console.log(item)
      this.emit_from = {
        username: item.username,
        email: item.email,
        mobile: item.mobile
      }
      this.id = item.id
    },
    async emit_list() {
      const res = await userEmit(this.id, this.emit_from)
      console.log('修改:', res)
      this.gitlist()
    },
    handleSizeChange(val) {
      console.log(val)
      this.userQuery.pagesize = val
      this.gitlist()
    },
    handleCurrentChange(val) {
      console.log(val)
      this.userQuery.pagenum = val
      this.gitlist()
    },
    async gitlist() {
      const res = await userlist(this.userQuery)
      console.log(res)
      this.tableData = res.users
      this.total = res.total
    },
    async del(id) {
      console.log(id)
      const res = await userDel(id)
      console.log(res)
      this.gitlist()
    },
    add_list() {
      this.$refs.user.validate(async (valid) => {
        if (valid) {
          const res = await userAdd(this.user_from)
          console.log(res)
          this.gitlist()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    keyword() {
      this.userQuery.query = this.keyword1
      this.gitlist()
    }
  }
}
</script>

<style scoped>
.el-card {
  margin-top: 20px;
}
.el-input {
  width: 30%;
}
</style>
