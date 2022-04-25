<template>
  <div>
    <h3>hello world</h3>
    <el-icon :size="20">
      <edit />
    </el-icon>
  </div>
</template>

<script>
import {Edit} from "@element-plus/icons"
export default {
  name: "Vue",
  components: {Edit},
  data() {
    return {};
  },
  mounted() {
      console.log(this.getList())
  },
  methods: {
      async getList(){
          let obj = {
              username:"admin",
              password:"123456"
          }
          let res = await this.$axios.post('http://www.ysqorz.top:8888/api/private/v1/login',obj);

          console.log(res);
      }
  },
};
</script>

<style lang="scss" scoped>
</style>
