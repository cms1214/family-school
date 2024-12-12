<script setup>
import {getNewsPageApi} from "@/api/user.js";
import {onMounted, ref} from "vue";

const data = ref({})

const cPage = ref(1)
const pageSize = ref(6)

onMounted(()=>{
  getData(cPage.value)
})

const getData = (num)=>{
  getNewsPageApi({
    currentPage: num,
    pageSize: pageSize.value
  }).then(res=>{
    data.value = res.data.items;
  })
}

</script>

<template>
  <div class="container">
    <div class="head">
      <div class="carousel">
        <el-carousel :interval="5000" arrow="never" trigger="click">
          <el-carousel-item v-for="item in 4">
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="description">
        <p class="subtitle">厚德、博学、笃行、创新</p>
        <h1 class="title">西南科大，一所具有悠久历史和深厚学术底蕴的大学</h1>
        <p class="text">
          西南科技大学，简称西南科大，是四川省人民政府与教育部共建高校，四川省人民政府与国家国防科技工业局共建高校，被教育部确定为国家重点建设的西部14所高校之一
        </p>
      </div>
    </div>


    <div class="news forum">
      <h1>校园要闻</h1>
      <div class="list">

        <div v-for="item in data.dataList" class="card">
          <img :src="item.newImg" />
          <div class="text">
            <h1>{{ item.newTitle }}</h1>
            <p class="time">{{ item.createTime }}</p>
          </div>
        </div>

      </div>
      <div class="page">
        <el-pagination
          background layout="prev, pager, next"
          :total="data.totalCount"
          :page-size="pageSize"
          @current-change="getData"
          v-model:current-page="cPage"
        />
      </div>
    </div>

    <div class="call forum">
      <h1>通知公告</h1>
      <div class="list">

        <div class="card" v-for="item in 5">
          <img src="@/assets/logo.png" />
          <div class="text">
            <h1>[公告] 2022年6月15日，校方通知</h1>
            <p class="time">2024年12月15日</p>
          </div>
        </div>

      </div>
      <div class="page">
        <el-pagination background layout="prev, pager, next" :total="10" />
      </div>

    </div>

  </div>



</template>

<style scoped>
.container{
  padding: 0 !important;
  width: 100%;
}
.head{
  display: flex;
  justify-content: space-between;
}
.head>div{
  width: 49.2%;
  height: 300px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 5px 10px 0px;
  border-radius: 15px;
}

.el-carousel{
  width: 100%;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 5px 10px 0px;
  border-radius: 15px;
}

.el-carousel__item:nth-child(1) {
  background: url("@/assets/carousel/1.jpg") center no-repeat;
  background-size: cover; /* 背景图片覆盖整个元素 */
}
.el-carousel__item:nth-child(2) {
  background: url("@/assets/carousel/2.jpg") center no-repeat;
  background-size: cover; /* 背景图片覆盖整个元素 */
}
.el-carousel__item:nth-child(3) {
  background: url("@/assets/carousel/3.jpg") center no-repeat;
  background-size: cover; /* 背景图片覆盖整个元素 */
}
.el-carousel__item:nth-child(4) {
  background: url("@/assets/carousel/4.jpg") center no-repeat;
  background-size: cover; /* 背景图片覆盖整个元素 */
}


.head .description{
  background-color: white;
  padding: 24px 200px 24px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(0, 0, 0, 0.06) url("@/assets/des_bg.png") center no-repeat;
  background-size: cover; /* 背景图片覆盖整个元素 */
  color: white;
}
.description .subtitle{
  margin-top: 6px;
  font-size: 16px;
}
.description .title{
  font-size: 22px;
  font-weight: 600;
  margin-top: 6px;
}
.description .text{
  margin-top: 12px;
  font-size: 14px;
  line-height: 24px;
}


.forum{
  margin-top: 24px;
  padding: 24px 12px 16px 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 5px 10px 0px;
  border-radius: 15px;
}
.forum>h1{
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  margin-left: 12px;
}

.forum .list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.forum .list .card{
  width: 510px;
  display: flex;
  align-items: center;
  padding: 12px 12px 12px 12px;
  border-radius: 15px;
  transition: all 0.3s;
  margin-top: 6px;
  cursor: pointer;
}
.forum .list .card:hover{
  background-color: rgba(49, 130, 206, 0.1);
}

.forum .list .card img{
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin-right: 12px;
}
.forum .list .card h1{
  font-size: 16px;
  width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.forum .list .card p{
  color: #A0AEC0;
  margin-top: 4px;
  font-size: 14px;
}

.forum .page{
  display: flex;
  justify-content: center;
}
.el-pagination{
  margin: 32px auto 12px auto;
}
</style>