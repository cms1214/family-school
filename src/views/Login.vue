<script setup>
import {h, ref} from "vue";
import {loginParentApi, loginStudentApi, loginTeacherApi} from "@/api/user.js";
import router from "@/router/router.js";
import {ElNotification} from "element-plus";

const account = ref('')
const password = ref('')

const select = ref('1')

const tryLogin = () => {
  if(account.value && password.value){
    select.value === '1' ? loginStudent() : select.value === '2' ? loginParent() : loginTeacher()
  }else{
    ElNotification({
      title: '登陆失败',
      message: h('i', { style: 'color: teal' }, '请输入完整的账号或密码'),
      type: 'error',
    })
  }
}

const loginStudent = () => {
  loginStudentApi({
    xuehao: account.value,
    studentPwd: password.value
  }).then(res=>{
    if(res.code===0){
      loginOK(res)
    }
  })
}
const loginParent = () => {
  loginParentApi({
    account: account.value,
    parentPwd: password.value
  }).then(res=>{
    if(res.code===0){
      loginOK(res)
    }
  })
}
const loginTeacher = () => {
  loginTeacherApi({
    gonghao: account.value,
    teacherPwd: password.value
  }).then(res=>{
    if(res.code===0){
      loginOK(res)
    }
  })
}


const loginOK = (res)=>{
  localStorage.setItem('role', select.value)
  localStorage.setItem('token', res.data.token)

  router.push("/")
  ElNotification({
    title: '登陆成功',
    message: h('i', { style: 'color: teal' }, '家校通服务平台，欢迎回来'),
    type: 'success',
  })
}


const getTime = () => {
  const hour = new Date().getHours()
  return hour < 12 ? 'Morning' : hour < 18 ? 'Afternoon' : 'Evening'
}
</script>

<template>
  <el-row>
    <el-col :span="8">
      <div class="form">
        <div class="logo"><i class="bi bi-feather"></i></div>
        <div class="welcome">
          <h1>欢迎使用 <b>家校通服务平台</b></h1>
          <p>为家校之间提供充分、准确、及时的沟通方式，为全面监控学生和学生成长提供有效的途径</p>
        </div>

        <h2>学号/工号</h2>
        <el-input
          size="large"
          v-model="account"
          placeholder="请输入学号/工号"
          class="input-with-select"
          clearable
        >
          <template #prepend>
            <el-select v-model="select" style="width: 80px;" size="large">
              <el-option label="学生" value="1" />
              <el-option label="家长" value="2" />
              <el-option label="老师" value="3" />
            </el-select>
          </template>
        </el-input>

        <h2>密码</h2>
        <el-input
            size="large"
            v-model="password"
            placeholder="请输入密码"
            class="input-with-select"
            type="password"
            clearable
        >
        </el-input>

        <div class="submit">
          <el-button class="bt" type="primary" size="large" @click="tryLogin">登录</el-button>
        </div>

        <div class="footer">
          <h1>还没有账号？ <router-link to="/register"><span type="primary">马上注册👉</span></router-link></h1>
          <p>Powered by Tang</p>
        </div>

      </div>
    </el-col>
    <el-col :span="16">
      <div class="background">
        <h1>Good {{getTime()}}</h1>
        <p>Mianyang, Sichuan</p>
      </div>
    </el-col>
  </el-row>

</template>

<style scoped>
.form{
  padding: 0px 50px 0px 50px;
}
.form .logo{
  height: 90px;
  width: 90px;
  margin-top: 100px;
  border-radius: 100px;
  box-shadow: 1px 5px 15px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #3182CE;
}
.form .welcome h1{
  margin-top: 30px;
  font-size: 24px;
}
.form .welcome p{
  margin-top: 10px;
  font-size: 16px;
  font-weight: 200;
  color: #6c757d;
}
.form h2{
  font-weight: 600;
  font-size: 14px;
  margin-top: 32px;
  margin-bottom: 5px;
}
.form .submit{
  display: flex;
  margin-top: 32px;
  justify-content: right;
}
.form .submit .bt{
  width: 110px;
  font-weight: 600;
  font-size: 16px;
  height: 45px;
}

.form .footer{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 48px;
  color: #6c757d;
}

.form .footer h1{
  font-size: 16px
}
.form .footer h1 span{
  color: #409eff;
  cursor: pointer;
}
.form .footer h1 span:hover{
  text-decoration:  underline;
}
.form .footer p{
  margin-top: 24px;
  font-size: 14px;
}





.background{
  background-image: url("@/assets/login_bg.jpg");
  background-size: cover; /* 背景图片覆盖整个元素 */
  background-repeat: no-repeat; /* 背景图片不重复 */
  height: 100vh;
  padding-top: 650px;
  padding-left: 60px;
  color: white;
  font-weight: 700;
  user-select: none;
  animation: bg_slide 40s linear forwards;
}
@keyframes bg_slide {
  0%{
    background-position-y: -50px;
  }
  100%{
    background-position-y: -200px;
  }
}
.background h1{
  font-size: 56px;
}
.background p{
  font-size: 19px;
}
</style>