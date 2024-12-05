<script setup>
import { useTokenStore } from '@/stores/token.js'
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useUserPasswordInfoStore } from '@/stores/user.js';
const userInfoPasswordStore = useUserPasswordInfoStore()





//调用useTokenStore得到状态
const tokenStore = useTokenStore();
// const status = ref({
//   isRegister: false,
//   isRepassword: false
// })
//控制注册与登录表单的显示， 默认显示注册
const isLogin = ref(true)
const isRegister = ref(false)
const isRepassword = ref(false)
//定义登录表单数据模型
const loginData = ref({
  username: '',
  password: ''
})
//定义数据模型
const registerData = ref({
  username: '',
  password: '',
  rePassword: ''
})
// 定义表单校验规则
const rules = {
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
  ],
  rePassword: [
     { required: true, message: '请输入确认密码', trigger: 'blur' },
     { validator: checkPassword }
 ],
  username: [
    //   第一个规则
    { required: true, message: '请输入用户名', trigger: 'blur' },
    //   第二个规则
    { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
  ]
}
const rules1 = {
  new_pwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
  ],
  re_pwd: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    { validator: checkPassword1 }
  ],
  username: [
    //   第一个规则
    { required: true, message: '请输入用户名', trigger: 'blur' },
    //   第二个规则
    { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
  ]
}
// 检查密码函数
// 在 Element Plus 的表单验证机制中，自定义验证函数需要遵循特定的签名，
// 即 validator(rule, value, callback)。即使你在当前的实现中没有使用 rule 参数，
// Element Plus 仍然会传递这个参数给验证函数。因此，不能简单地删除 rule 参数。
function checkPassword(rule,value,callback) {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== registerData.value.password) {
    callback (new Error('两次密码不一致'))
  } else {
    callback
  }
}
function checkPassword1(rule,value,callback) {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== rePassData.value.new_pwd) {
    callback (new Error('两次密码不一致'))
  } else {
    callback
  }
}
//调用后台接口 完成注册
import {userInfoUpdatePassword1Service, userLoginService, userRegisterService} from "@/api/user.js";
import {ElMessage} from "element-plus";
import login from "@/views/Login.vue";
import router from "@/router/index.js";
//用于注册
const register = async () => {
  // await是同步等待异步调用结果 上面就要async
  let result = await userRegisterService(registerData.value)
  ElMessage.success('注册成功')
}
//用于登录的事件函数
const loginUser = async () => {
  let result = await userLoginService(loginData.value)
  //保存token 到pinia中

  tokenStore.setToken(result.data)
  if (tokenStore!==null){
    alert('存入token'+tokenStore.token)
  }
  userInfoPasswordStore.setPasswordInfo(loginData.value.password)
  alert('密码: ' + userInfoPasswordStore.passwordInfo)
  // userInfoPasswordStore.setPasswordInfo=loginData.value.password
  // alert('密码'+userInfoPasswordStore)
  ElMessage.success('登录成功!')
  await router.push('/layout')
}
/*const loginUser = async () => {
  let result = await userLoginService(loginData.value)
  ElMessage.success('登录成功')
  await router.push('/')
/!*  if (result.code === 200) {
    // 提示登录成功
    ElMessage.success('登录成功')
  }else {
    ElMessage.error(result.message)
  }*!/
}*/
function func1() {
  isRegister.value = false
  isRepassword.value = true
  isLogin.value = false
}
function func2(){
  isRegister.value = false
  isRepassword.value = false
  isLogin.value = true
}
function func3(){
  isRegister.value = true
  isRepassword.value = false
  isLogin.value = false
}
function returnF(){
  isRegister.value = false
  isRepassword.value = false
  isLogin.value = true
}
const rePassData = ref({
  username: '',
  new_pwd: '',
  re_pwd: ''
})
const rePass = async () => {
  let result = await userInfoUpdatePassword1Service(rePassData.value)
  ElMessage.success('修改密码成功')
  await router.push('/login')
  returnF()
}
</script>

<template>
<!--  <el-form
      :model="ruleForm" ！！！
      :rules="rules" ！！！
  >-->
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册表单 来自于ElementsPlus-->
      <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
<!--        prop="username"是具体到哪个规则-->
        <el-form-item prop="username">
          <el-input :prefix-icon="User"  placeholder="请输入用户名" v-model="registerData.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input :prefix-icon="Lock"  type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
        </el-form-item>
        <el-form-item prop="rePassword">
<!--          <h1>{{registerData.password}}</h1>-->
          <el-input :prefix-icon="Lock" type="password" placeholder="请再次输入密码" v-model="registerData.rePassword"></el-input>
<!--          <h1>{{registerData.rePassword}}</h1>-->
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="register">
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="returnF()">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登录表单 -->
      <el-form ref="form" size="large" autocomplete="off" v-if="isLogin" :model="loginData" :rules="rules">
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="loginData.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="loginData.password"></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
<!--            <el-checkbox>记住我</el-checkbox>-->
            <el-link type="primary" :underline="false" @click="func1()">忘记密码？</el-link>
          </div>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="loginUser">登录</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="func3()">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 忘记密码表单 来自于ElementsPlus-->
      <el-form ref="form" size="large" autocomplete="off" v-if="isRepassword" :model="rePassData" :rules="rules1">
        <el-form-item>
          <h1>忘记密码</h1>
        </el-form-item>
        <!--        prop="username"是具体到哪个规则-->
        <el-form-item prop="username">
          <el-input :prefix-icon="User"  placeholder="请输入用户名" v-model="rePassData.username"></el-input>
        </el-form-item>
        <el-form-item prop="new_pwd">
          <el-input :prefix-icon="Lock"  type="password" placeholder="请输入密码" v-model="rePassData.new_pwd"></el-input>
        </el-form-item>
        <el-form-item prop="re_pwd">
          <!--          <h1>{{registerData.password}}</h1>-->
          <el-input :prefix-icon="Lock" type="password" placeholder="请再次输入密码" v-model="rePassData.re_pwd"></el-input>
          <!--          <h1>{{registerData.rePassword}}</h1>-->
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="rePass">
            提交
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="func2()">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>

    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
    url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>