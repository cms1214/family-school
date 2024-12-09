<script setup>

import {h, ref} from "vue";
import {ElNotification} from "element-plus";
import router from "@/router/router.js";

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
      router.push("/login")
      ElNotification({
        title: '注册成功',
        message: h('i', { style: 'color: teal' }, '请登录家校通服务平台'),
        type: 'success',
      })
    } else {
      console.log('error submit!')
    }
  })
}

const rules = ref({
  type: [
    {required: true, message: 'Please select a location', trigger: 'change'},
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
  <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef">

    <el-form-item prop="type">
        <el-segmented v-model="ruleForm.type" :options="typeOptions" />
    </el-form-item>

    <el-form-item prop="id">
      <el-input placeholder="请输入学号/工号" v-model="ruleForm.id">
        <template #prepend>
          <el-select v-model="select" style="width: 115px">
            <el-option label="一班" value="1" />
            <el-option label="二班" value="2" />
            <el-option label="三班" value="3" />
          </el-select>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item prop="pwd">
      <el-input placeholder="请输入密码" v-model="ruleForm.pwd"></el-input>
    </el-form-item>
    <el-form-item prop="confirm">
      <el-input placeholder="请再次输入密码" v-model="ruleForm.confirm"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        Submit
      </el-button>
    </el-form-item>

  </el-form>
</template>

<style scoped>

</style>