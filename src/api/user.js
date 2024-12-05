//导入request.js请求工具
import request from "@/utils/request.js";
//提供调用  注册接口的函数 要导出供外部使用
export const userRegisterService = (data) => {
    //借助UrlSerachParms完成传递
    const params = new URLSearchParams();
    //遍历data封装到params里
    for(let key in data){
        params.append(key, data[key])
    }
    return request.post('/user/register', params)
}

export const userLoginService = (data) => {
    const params = new URLSearchParams();
    for(let key in data){
        params.append(key, data[key])
    }
    return request.post('/user/login', params)
}
//获取个人信息
export const userInfoGetService = ()=>{
    return request.get('/user/userinfo');
}
//修改个人信息
export const userInfoUpdateService = (userInfo)=>{
    return request.put('/user/update',userInfo)
}
//修改头像
export const userAvatarUpdateService=(avatarUrl)=>{
    let params = new URLSearchParams();
    params.append('avatarUrl',avatarUrl)
    return request.patch('/user/updateAvatar',params)
}

export const userInfoUpdatePasswordService=(data)=>{
    return request.patch('/user/updatePwd',data)
}

export const userInfoUpdatePassword1Service=(data)=>{
    return request.post('/user/updata',data)
}
