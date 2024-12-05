<script setup>
import { ref } from 'vue'

import { useUserPasswordInfoStore } from '@/stores/user.js';
const userInfoPasswordStore = useUserPasswordInfoStore()



function getUserInfo(){
console.log(userInfoPasswordStore.passwordInfo)
}

const registerData = ref({
  old_pwd:'',
  new_pwd:'',
  re_pwd:''
})
const rules = {
  old_pwd: [
    {  trigger: 'blur' },
    {validator: checkOldPassword}
  ],
  new_pwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
  ],
  re_pwd: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    { validator: checkPassword }
  ],
}
function checkOldPassword(rule,value,callback) {
  if (value === '') {
    callback(new Error('请输入密码'))
  }else if (value !== userInfoPasswordStore.passwordInfo) {

    callback(new Error('密码错误'))
  }else {
    callback
  }
   }
function checkPassword(rule,value,callback) {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== registerData.value.new_pwd) {
    callback (new Error('两次密码不一致'))
  } else if (registerData.value.old_pwd=== registerData.value.new_pwd){
    callback(new Error('新旧密码一致'))
  }else
  {
    callback
      }
   }



import {userInfoUpdatePasswordService} from '@/api/user.js'
import { ElMessage } from 'element-plus';
import router from "@/router/index.js";
const updateUserPassword = async ()=>{
  if (registerData.value.new_pwd !== registerData.value.re_pwd){
    ElMessage.error('两次密码不一致')
    reset()
    return
  }
  if (userInfoPasswordStore.passwordInfo === registerData.value.new_pwd){
    ElMessage.error('新旧密码一致')
    reset()
    return
  }
  let result = await userInfoUpdatePasswordService(registerData.value)
  alert(registerData.value.new_pwd)
  alert(registerData.value.re_pwd)
  alert(registerData.value.old_pwd)
  console.log(registerData.value)
  ElMessage.success(result.message? result.message:'修改成功')
   router.push('/login')

}


function reset(){
  registerData.value.new_pwd=''
  registerData.value.re_pwd=''
}
</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>修改密码</span>
      </div>
      <el-button type="text" @click="getUserInfo">获取用户信息</el-button>
    </template>
    <div class="form-container">
      <el-row>
        <el-col :span="48">
          <el-form :model="registerData" :rules="rules"  size="large">
            <el-form-item label="请输入原密码" required prop="old_pwd">
              <el-input type="password" v-model="registerData.old_pwd" ></el-input>
            </el-form-item>
            <el-form-item label="请输入新密码" prop="new_pwd" required>
              <el-input type="password" v-model="registerData.new_pwd"></el-input>
            </el-form-item>
            <el-form-item label="请确认新密码" prop="re_pwd" required>
              <el-input type="password" v-model="registerData.re_pwd"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateUserPassword">提交修改</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<style scoped>.form-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  padding: 20px; /* 添加一些内边距 */
}

</style>