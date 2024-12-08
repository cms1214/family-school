<script setup>

</script>

<template>

    <div class="nav">
      <h1 class="title"><i class="bi bi-feather"></i>家校通服务平台</h1>
      <div class="line"></div>
      <div class="menu-list active">
        <div class="icon">
          <i class="bi bi-house-fill"></i>
        </div>
        <h3>主页</h3>
      </div>
      <div class="menu-list">
        <div class="icon">
          <i class="bi bi-book-half"></i>
        </div>
        <h3>作业</h3>
      </div>
      <div class="menu-list active">
        <div class="icon">
          <i class="bi bi-people-fill"></i>
        </div>
        <h3>学生列表</h3>
      </div>

      <h2>账户管理</h2>

      <div class="menu-list active">
        <div class="icon">
          <i class="bi bi-person-lines-fill"></i>
        </div>
        <h3>账户设置</h3>
      </div>
      <div class="menu-list">
        <div class="icon">
          <i class="bi bi-box-arrow-left"></i>
        </div>
        <h3>退出</h3>
      </div>

      <img src="@/assets/icon-documentation.svg" alt="">

      <h4>需要帮助？</h4>
      <p>点击这里获取帮助</p>
      <input type="button" value="联系老师">


    </div>

  <div class="container">
    <div class="body">
      <div class="main" style="height: 800px">
        Main
      </div>
      <div class="footer">
        <h1 class="text-lg text-red-500">Footer</h1>
      </div>
    </div>
  </div>

  <div class="background"></div>
</template>

<style scoped>
.container{
  padding: 32px 0px 0px 340px;
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
.title{
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  margin-top: 36px;
  margin-bottom: 30px;
  font-size: 20px;
}
.title i{
  font-size: 24px;
  margin-right: 8px;
}
.line{
  border-bottom: #dcdcdc 1px solid;
  margin-bottom: 20px;
  width: 80%;
}

.menu-list{
  width: 80%;
  height: 50px;
  margin-bottom: 12px;

  border-radius: 10px;
  display: flex;
  align-items: center;
}
.menu-list:hover{
  cursor: pointer;
}
.menu-list .icon{
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
.menu-list h3{
  color: #A0AEC0;
  font-weight: 700;
  font-size: 15px;
}

.active{
  box-shadow: 0px 5px 10px #ededed;
}
.active .icon{
  color: white;
  background-color: #3182CE;
}
.active h3{
  color: #2D3748;
}

h2{
  width: 80%;
  font-weight: 700;
  font-size: 15px;
  margin-top: 15px;
  margin-bottom: 10px;
}

img{
  margin-top: 10px;
  margin-bottom: -15px;
  width: 200px;
}

h4{
  font-size: 16px;
  font-weight: 600;
}
p{
  font-size: 14px;
  letter-spacing: 1px;
  color: #718096;
  margin-bottom: 20px;
}

input{
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
}

.background{
  z-index: -99999;
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
</style>