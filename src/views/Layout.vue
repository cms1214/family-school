<script setup>
import {h, ref} from "vue";
import router from "@/router/router.js";
import {ElNotification} from "element-plus";

const activeIndex = ref(0);
const setActive = (index) => {
  activeIndex.value = index;
}

const exit = () => {
  localStorage.removeItem('token')
  router.push('/login')
  ElNotification({
    title: '退出成功',
    message: h('i', { style: 'color: teal' }, '请重新登录'),
    type: 'success',
  })
}
</script>

<template>

  <div class="nav">
    <h1 class="title"><i class="bi bi-feather"></i>家校通服务平台</h1>
    <div class="line"></div>
    <div class="menu-list" :class="{ active: activeIndex === 0 }" @click="setActive(0)">
      <div class="icon">
        <i class="bi bi-house-fill"></i>
      </div>
      <h3>主页</h3>
    </div>
    <div class="menu-list" :class="{ active: activeIndex === 1 }" @click="setActive(1)">
      <div class="icon">
        <i class="bi bi-book-half"></i>
      </div>
      <h3>作业</h3>
    </div>
    <div class="menu-list" :class="{ active: activeIndex === 2 }" @click="setActive(2)">
      <div class="icon">
        <i class="bi bi-people-fill"></i>
      </div>
      <h3>学生列表</h3>
    </div>

    <h2>账户管理</h2>

    <div class="menu-list" :class="{ active: activeIndex === 3 }" @click="setActive(3)">
      <div class="icon">
        <i class="bi bi-person-lines-fill"></i>
      </div>
      <h3>账户设置</h3>
    </div>
    <div class="menu-list" :class="{ active: activeIndex === 4 }" @click="setActive(4),exit()">
      <div class="icon">
        <i class="bi bi-box-arrow-left"></i>
      </div>
      <h3>退出</h3>
    </div>

    <img src="../assets/icon-documentation.svg" alt="">

    <h4>需要帮助？</h4>
    <p>点击这里获取帮助</p>
    <input type="button" value="联系班主任">


  </div>

  <div class="container max-w-full">
    <div class="header">
      <div class="left">
        <p>页面 / 主页</p>
        <h1>主页</h1>
      </div>
      <div class="right">
        <div class="search">
          <i class="bi bi-search"></i>
          <input type="text" placeholder="搜索"></input>
        </div>
        <img src="../assets/logo.png">
        <i class="bi bi-bell-fill"></i>
      </div>
    </div>

    <div class="body">
      <div class="main" style="height: 1200px;">
        Main
      </div>
      <div class="footer">
        <p>@2024.12，made by GROUPE3 for a better web.</p>
      </div>
    </div>
  </div>

  <div class="bg-img"></div>
  <div class="bg-cover"></div>
</template>

<style scoped>
.container{
  padding: 32px 20px 18px 340px;
}
.nav{
  border-radius: 15px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  background: white;

  position: fixed;
  left: 20px;
  top: 32px;
}
.nav .title{
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  margin-top: 36px;
  margin-bottom: 30px;
  font-size: 20px;
}
.nav .title i{
  font-size: 24px;
  margin-right: 8px;
}
.nav .line{
  border-bottom: #dcdcdc 1px solid;
  margin-bottom: 20px;
  width: 80%;
}

.nav .menu-list{
  width: 80%;
  height: 50px;
  margin-bottom: 12px;

  border-radius: 10px;
  display: flex;
  align-items: center;
  transition: 300ms;
}
.nav .menu-list:hover{
  cursor: pointer;
  background-color: rgba(49, 130, 206, 0.1);
}
.nav .menu-list .icon{
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  color:#3182CE;
  font-size: 16px;
  background-color: rgba(49, 130, 206, 0);

  border-radius: 10px;
  margin-right: 15px;
  margin-left: 12px;
}
.nav .menu-list h3{
  color: #A0AEC0;
  font-weight: 700;
  font-size: 15px;
}

.nav .active{
  box-shadow: 0px 5px 10px #ededed;
}
.nav .active:hover{
  cursor: auto;
  background-color: white;
}
.nav .active .icon{
  color: white;
  background-color: #3182CE;
}
.nav .active h3{
  color: #2D3748;
}

.nav h2{
  width: 80%;
  font-weight: 700;
  font-size: 15px;
  margin-top: 15px;
  margin-bottom: 10px;
}

.nav img{
  margin-top: 10px;
  margin-bottom: -15px;
  width: 200px;
}

.nav h4{
  font-size: 16px;
  font-weight: 600;
}
.nav p{
  font-size: 14px;
  letter-spacing: 1px;
  color: #718096;
  margin-bottom: 20px;
}

.nav input{
  width: 80%;
  height: 42px;
  border-radius: 10px;
  border: none;
  background-color: #3182CE;
  color: white;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 30px;
  cursor: pointer;
  transition: 200ms;
}
.nav input:hover{
  background-color: #1d6cb6;
}

.header{
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}
.header .left{
  color: white;
}
.header .left p{
  font-size: 14px;
  letter-spacing: .8px;
}
.header .left h1{
  font-size: 17px;
  font-weight: 600;
  margin-top: 5px;
  letter-spacing: 1px;
}
.header .right{
  display: flex;
  align-items: center;
}
.header .right .search{
  background-color: white;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 15px;
  margin-right: 24px;
}
.header .right .search i{
  margin-right: 10px;
}
.header .right .search input{
  outline: none;
}
.header .right .search input::placeholder{
  font-size: 15px;
}
.header .right img{
  height: 42px;
  border-radius: 50px;
  margin-right: 24px;
  cursor: pointer;
}
.header .right .bi-bell-fill{
  color: white;
  margin-right: 20px;
  font-size: 18px;
  cursor: pointer;
}

.body .main{
  background: white;
  border-radius: 15px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.06);
}

.footer p{
  color: #A0AEC0;
  font-size: 15px;
  margin-top: 18px;
}

.bg-img{
  z-index: -99;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 360px;
  background-image: url("@/assets/Background.png");
  background-size: cover; /* 背景图片覆盖整个元素 */
  background-repeat: no-repeat; /* 背景图片不重复 */
  background-position: center; /* 背景图片居中 */
}
.bg-cover{
  z-index: -999;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #F7FAFC;
}
</style>