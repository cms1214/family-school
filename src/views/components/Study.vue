<script setup>

import {ref} from "vue";
import Comment from "@/views/components/childs/Comment.vue";

const percentage = ref(20)

const workData = ref([
  {
    name: '12月11日数学作业',
    score: '/',
    status: '完成中',
    percentage: 70,
  },
  {
    name: '语文作业先做！！！',
    score: '/',
    status: '完成中',
    percentage: 20,
  },
  {
    name: '三年级一班数学作业',
    score: 98,
    status: '已完成',
    percentage: 100,
  },
  {
    name: '12.08 English homework',
    score: 59,
    status: '已完成',
    percentage: 100,
  }
])
</script>

<template>
  <div class="contain">
    <Comment></Comment>

    <div class="work">
      <h1>作业</h1>
      <h2><i class="bi bi-exclamation-circle-fill"></i>还有未完成的作业</h2>
      <div class="work-header">
        <p class="item1">作业名称</p>
        <p class="item2">得分</p>
        <p class="item3">状态</p>
        <p class="item4">完成进度</p>
      </div>
      <div class="work-list">

        <div class="card" v-for="item in workData">
          <div class="line"></div>
          <div class="items">
            <p class="item1">{{item.name}}</p>
            <p class="item2">{{item.score}}</p>
            <p class="item3">{{ item.status }}</p>
            <p class="item4">
              {{item.percentage}}%
              <el-progress :percentage="item.percentage" :show-text=false	 />
            </p>
            <p class="item5">
              <el-button type="primary" size="mini">查看</el-button>
            </p>
          </div>
        </div>


      </div>
    </div>
  </div>


</template>

<style scoped>
.contain > div{
  box-shadow: rgba(0, 0, 0, 0.06) 0px 5px 10px 0px;
  border-radius: 15px;
  background-color: white;
  padding: 24px;
}


.work h1{
  font-size: 16px;
  margin-bottom: 12px;
  font-weight: 600;
}
.work h2{
  margin-bottom: 24px;
  font-size: 14px;
  color: #718096;
}
.work h2 i{
  color: rgb(237.5, 189.9, 118.5);
  margin-right: 8px;
}

.work-header{
  display: flex;
  font-size: 12px;
  font-weight: 600;
  color: #718096;
}
.work-header .item1{
  flex: 0.35;
}
.work-header .item2{
  flex: 0.2;
}
.work-header .item3{
  flex: 0.2;
}
.work-header .item4{
  flex: 0.25;
}

.work-list .card .items{
  display: flex;
  font-size: 14px;
  align-items: center;
}

.work-list .card .line{
  width: 100%;
  border-bottom: #E2E8F0 1px solid;
  margin: 16px 0 16px 0;

}
.work-list .item1{
  flex: 0.35;
  font-weight: 600;
}
.work-list .item2{
  flex: 0.2;
  color: #718096;
}
.work-list .item3{
  flex: 0.2;
  color: #718096;
}
.work-list .item4{
  flex: 0.1;
  color: #718096;
}
.work-list .item5{
  flex: 0.15;
  color: #718096;
  text-align: center;
}

</style>