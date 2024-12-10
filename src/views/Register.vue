<script setup>

import {h, ref} from "vue";
import {ElNotification} from "element-plus";
import router from "@/router/router.js";
import {registerParentApi, registerStudentApi, registerTeacherApi} from "@/api/user.js";

const ruleFormRef = ref(null);
const ruleForm = ref({
  type: '',
  id: '',
  pwd: '',
  confirm: ''
})
const select = ref("1")

const typeOptions = ['学生','家长','老师']

const checkPass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== ruleForm.value.pwd) {
    callback(new Error("密码不一致"))
  } else {
    callback()
  }
}

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      // 根据身份选择不同的注册接口
      if (ruleForm.value.type==='学生'){
        registerStudent()
      }
      if (ruleForm.value.type==='家长'){
        registerParent()
      }
      if (ruleForm.value.type==='老师'){
        registerTeacher()
      }
    } else {
      console.log('error submit!')
    }
  })
}

// 三种不同类别的注册接口
const registerStudent = ()=>{
  console.log("学生注册")
  registerStudentApi({
    classId:select.value,
    xuehao:ruleForm.value.id,
    studentPwd:ruleForm.value.confirm
  }).then(res=>{
    if (res.code===0){
      registerOK()
    }
  })
}
const registerParent = ()=>{
  console.log("家长注册")
  registerParentApi({
    // classId:select.value,
    account:ruleForm.value.id,
    parentPwd:ruleForm.value.confirm
  }).then(res=>{
    if (res.code===0){
      registerOK()
    }
  })
}
const registerTeacher = ()=>{
  console.log("老师注册")
  registerTeacherApi({
    // classId:select.value,
    gonghao:ruleForm.value.id,
    teacherPwd:ruleForm.value.confirm
  }).then(res=>{
    if (res.code===0){
      registerOK()
    }
  })
}

const registerOK=()=>{
  router.push("/login")
  ElNotification({
    title: '注册成功',
    message: h('i', { style: 'color: teal' }, '请登录家校通服务平台'),
    type: 'success',
  })
}


const rules = ref({
  type: [
    {required: true, message: '请选择一个注册身份', trigger: 'change'},
  ],
  id: [
    {required: true, message: '请输入学号/工号', trigger: 'blur'},
    {min: 1, max: 20, message: '请输入正确的学号/工号', trigger: 'blur'},
  ],
  pwd: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 12, message: '密码长度在6-12位之间', trigger: 'blur'}
  ],
  confirm: [
    {validator: checkPass, trigger: 'blur'}
  ],
})

</script>

<template>
  <div class="container">
    <div class="logo"><i class="bi bi-feather"></i></div>
    <div class="body">
      <div class="header">
        <h1>注册</h1>
      </div>
      <el-form class="main" :model="ruleForm" :rules="rules" ref="ruleFormRef">

        <div class="input_item">
          <h2>身份</h2>
          <el-form-item prop="type">
            <el-segmented v-model="ruleForm.type" :options="typeOptions" size="large"/>
          </el-form-item>
        </div>

        <div class="input_item">
          <h2>学号/工号</h2>
          <el-form-item prop="id">
            <el-input placeholder="请输入学号/工号" v-model="ruleForm.id"  size="large" clearable>
              <template #prepend>
                <el-select v-model="select" style="width: 80px" size="large">
                  <el-option label="一班" value="1" />
                  <el-option label="二班" value="2" />
                  <el-option label="三班" value="3" />
                </el-select>
              </template>
            </el-input>
          </el-form-item>
        </div>

        <div class="input_item">
          <h2>密码</h2>
          <el-form-item prop="pwd">
            <el-input placeholder="请输入密码" v-model="ruleForm.pwd" type="password" size="large" clearable></el-input>
          </el-form-item>
        </div>

        <div class="input_item">
          <h2>确认密码</h2>
          <el-form-item prop="confirm">
            <el-input placeholder="请再次输入密码" v-model="ruleForm.confirm" type="password" size="large" clearable></el-input>
          </el-form-item>
        </div>


        <el-form-item class="submit">
          <el-button type="primary" @click="submitForm(ruleFormRef)" size="large" >
            注册
          </el-button>
        </el-form-item>

      </el-form>
    </div>
    <div class="footer">
      <h1>已经注册？ <router-link to="/login"><span type="primary">马上登录👉</span></router-link></h1>
      <p>Powered by Tang</p>
    </div>
  </div>

</template>

<style scoped>
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
}

.logo{
  height: 90px;
  width: 90px;
  margin-top: 80px;
  margin-bottom: 48px;
  border-radius: 100px;
  box-shadow: 1px 5px 15px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #3182CE;
}

.body{
  width: 680px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.header{
  display: flex;
  align-items: center;
  height: 50px;
  border-radius: 5px 5px 0 0;
  border-top: 2px solid #409eff;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}
.header h1{
  font-size: 15px;
  font-weight: 600;
  margin-left: 20px;
  color: #409eff;
}

.main{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  padding-left: 25px;
  padding-right: 25px;
}

.main .input_item {
  width: 300px;
  margin-top: 10px;
}
.main .input_item h2 {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
}

.submit{
  width: 100%;
  margin-top: 30px;
  margin-bottom: 20px;
}
.submit .el-button{
  width: 100%;
  font-weight: 600;
  font-size: 15px;
}



.footer{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 48px;
  color: #6c757d;
}

.footer h1{
  font-size: 16px
}
.footer h1 span{
  color: #409eff;
  cursor: pointer;
}
.footer h1 span:hover{
  text-decoration:  underline;
}
.footer p{
  margin-top: 24px;
  font-size: 14px;
}
</style>