//定制请求的实例
//导入axios  npm install axios
import axios from 'axios';
import {ElMessage} from "element-plus";
import router from "@/router";
import {useTokenStore} from "@/stores/token.js";
//定义一个变量,记录公共的前缀  ,  baseURL
const baseURL = 'http://localhost:8080';
const instance = axios.create({baseURL})
//添加请求拦截器
instance.interceptors.request.use(
    (config)=>{
        //在发送请求之前做什么
        let tokenStore = useTokenStore()
        //如果token中有值，再携带
        if(tokenStore.token){
            config.headers.Authorization=tokenStore.token
        }
        return config
    },
    (err)=>{
        //如果请求错误做什么
        Promise.reject(err)
    }
)

//添加响应拦截器
instance.interceptors.response.use(
    result => {
        //200，代表本次操作成功
        if (result.data.code === 200) {
            return result.data;
        }
        //代码走到这里，代表业务状态码不是200，本次操作失败
        ElMessage.error(result.data.message || '服务异常');
        return Promise.reject(result.data);//异步的状态转化成失败的状态
    },
    err => {
// 获取响应错误对象
        if (error.response) {
            const { status } = error.response;

            // 如果是 401 错误，说明需要登录
            if (status === 401) {
                ElMessage.error('请先登录！'); // 显示错误提示
                router.push('/login');  // 跳转到登录页
            } else {
                ElMessage.error('服务异常');
            }
        } else {
            // 网络错误、请求超时等其他情况
            ElMessage.error('请求失败，请稍后再试');
    }
        return Promise.reject(err);
    }
)

export default instance;