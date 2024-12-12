<script setup>
import {getStudentInfoApi} from "@/api/user.js";
import {onMounted, ref} from "vue";

const comment = ref('');

onMounted(()=>{
  getStudentInfoApi(localStorage.getItem("user"))
    .then(res=>{
        if(res.code===0){
          // console.log(res.data)
          comment.value = res.data.item.comment
        }
      }
    )
})
</script>

<template>
  <div class="comment">
    <div class="left">
      <h1>老师评语</h1>
      <div class="score">
        <i class="bi bi-flower2"></i>
        <i class="bi bi-flower2"></i>
        <i class="bi bi-flower2"></i>
        <i class="bi bi-flower2"></i>

      </div>
      <p class="text">
        {{ comment }}
      </p>
      <p class="footer">
        @小沈老师
      </p>
    </div>
    <img src="@/assets/svg/teacher.svg" />
  </div>
</template>

<style scoped>
.comment{
  box-shadow: rgba(0, 0, 0, 0.06) 0px 5px 10px 0px;
  border-radius: 15px;
  background-color: white;
  padding: 24px;

  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.comment .left{
  width: 55%;
}
.comment .score i{
  margin-right: 8px;
  font-size: 20px;
  color: #dc3538;
}
.comment .left h1{
  font-size: 16px;
  margin-bottom: 12px;
  font-weight: 600;

}
.comment .left .text{
  margin-top: 12px;
  font-size:  16px;
  line-height: 32px;
}
.comment .left .footer{
  margin-top: 12px;
  font-style: italic;
  font-size: 14px;
  color: #A0AEC0;
}

.comment img{
  height: 250px;
  margin-top: -24px;
  margin-bottom: -24px;
}

</style>