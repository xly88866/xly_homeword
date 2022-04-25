import { createRouter,createWebHashHistory } from "vue-router";

export default createRouter({
    history: createWebHashHistory(),
    //定义路由地址
    routes: [
        //首页
        {
            path: "/",
            name: "home",
            component: () => import("../views/Home.vue")
        }
    ]
})