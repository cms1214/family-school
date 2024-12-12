<script setup>
import {onMounted} from "vue";
import {getStudentInfoApi} from "@/api/user.js";

onMounted(()=>{
  // getStudentInfoApi(localStorage.getItem("user")).then(res=>{
  //   if(res.code===0){
  //     console.log(res.data)
  //   }
  //
  // })
})
</script>

<template>
  <div class="contain">
    <h1>用户设置（时间不够做不完了）</h1>
  </div>
</template>

<style scoped>
.contain{
  box-shadow: rgba(0, 0, 0, 0.06) 0 5px 10px 0;
  border-radius: 15px;
  background-color: white;
  padding: 24px;
}
.contain > h1{
  font-size: 16px;
  font-weight: 600;

}
</style>