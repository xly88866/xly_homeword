import { createApp } from 'vue'
import App from './App.vue'

//前置对象
const app = createApp(App);

//路由配置
import router from "./router/index.js";

//vuex配置
import store from "./store/index.js";

//elementUI配置
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'

//axios拦截器配置
import axios from "./utils/request.js";
app.config.globalProperties.$axios = axios;

app.use(router).use(store).use(ElementPlus).mount('#app')
