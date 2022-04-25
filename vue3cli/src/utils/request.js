//导入vuex
import axios from "axios";

//创建axios对象
const Server = axios.create({
    baseURL:"",//基地址
    timeout:"",
})

//前置拦截器
Server.interceptors.request.use((config)=>{
    //后续可以配置token自己
    return config
},(err)=>{
    return Promise.reject(err);
})


//后置拦截器
Server.interceptors.request.use((response)=>{
    return response;
},(err)=>{
    return Promise.reject(err);
})

export default Server;