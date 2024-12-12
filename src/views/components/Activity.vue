<script setup>
import {h, onMounted, reactive, ref} from "vue";
import {ElNotification} from "element-plus";
import {delActApi, getActApi, postActApi, updateActApi} from "@/api/user.js";
// 权限判断
const role = localStorage.getItem('role')

const form = reactive({
  activityTime:'',
  activityTitle:'',
  activityContent:''
})

const submit = () => {
  console.log(form)
  if (form.activityTime && form.activityTitle && form.activityContent){
    postActApi(form).then((res)=>{
      if(res.code===0){
        ElNotification({
          title: '提交成功',
          message: h('i', { style: 'color: teal' }, '活动已添加'),
          type: 'success',
        })
        getActivity()
      }
    })

  }else {
    ElNotification({
      title: '提交失败',
      message: h('i', { style: 'color: teal' }, '请填写正确的活动内容'),
      type: 'error',
    })
  }
}


// 获取活动列表
const actList = ref([{
  activityId: null,
  activityTime: '',
  activityTitle: '',
  activityContent: '',
  activityImg: '',
}])
const actListLeft = ref([])
const actListRight = ref([])

const getActivity = ()=>{
  getActApi().then(res=>{
    if(res.code===0){
      actList.value = res.data.list
      actListLeft.value = actList.value.filter((value, index) => index % 2 === 0);
      actListRight.value = actList.value.filter((value, index) => index % 2 !== 0);

    }
  })
}
onMounted(()=>{
  getActivity()
})


// 编辑活动
const editActVisible = ref(false)
const actForm = ref({
  activityId:null,
  activityTime:'',
  activityTitle:'',
  activityContent:'',
})

// 获取活动信息
const getActInfo = (id)=>{
  editActVisible.value = true
  actForm.value = actList.value.find(item => item.activityId === id);
}


//提交活动
const editActSubmit = ()=>{
  editActVisible.value = false
  updateActApi(actForm.value).then((res)=>{
    if(res.code===0){
      ElNotification({
        title: '提交成功',
        message: h('i', { style: 'color: teal' }, '活动信息已修改'),
        type: 'success',
      })
      getActivity()
    }
  })
}

// 删除活动
const delAct = (id)=>{
  console.log('删除')
  // 删除活动
  delActApi(id).then(res=>{
    if(res.code===0){
      getActivity()
      ElNotification({
        title: '删除成功',
        message: h('i', { style: 'color: teal' }, '活动已删除'),
        type: 'success',
      })
    }
  })
}


</script>

<template>
  <!---------------------------修改活动信息的弹窗----------------------------->
  <el-dialog
      title="修改活动信息"
      width="500"
      v-model="editActVisible"
  >
    <div class="dialog-footer">

      <el-form
          ref="formRef"
          label-width="auto"
          class="demo-dynamic"
      >
        <el-form-item label="学号" size="large">
          <el-date-picker
              v-model="actForm.activityTime"
              type="date"
              placeholder="Select date and time"
          />
        </el-form-item>
        <el-form-item label="姓名" prop="studentName" size="large">
          <el-input v-model="actForm.activityTitle" placeholder="请输入活动标题"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="studentAge" size="large">
          <el-input v-model="actForm.activityContent" placeholder="请输入活动内容" type="textarea" :rows="5"></el-input>
        </el-form-item>

      </el-form>


      <el-button @click="editActVisible = false">取消</el-button>
      <el-button type="primary" @click="editActSubmit">
        确认
      </el-button>
    </div>
  </el-dialog>



<!--  班级活动-->
<!--  老师(only)编辑活动列表-->
  <div class="contain">
    <div class="left">

      <div class="card" v-if="role === '3'">
        <h1>添加活动</h1>
        <el-form :model="form" label-width="80px" label-position="left">
          <el-form-item size="large" label="活动时间">
            <el-date-picker
                v-model="form.activityTime"
                type="date"
                placeholder="选择日期时间"
            />
          </el-form-item>

          <el-form-item label="活动名称"  size="large">
            <el-input v-model="form.activityTitle" placeholder="请输入活动名称"></el-input>
          </el-form-item>
          <el-form-item label="活动详情" size="large">
            <el-input v-model="form.activityContent" type="textarea" placeholder="请输入活动详情" />
          </el-form-item>

          <div class="submit">
            <el-button @click="submit" type="primary" size="large" style="text-align: right">提交活动</el-button>
          </div>
        </el-form>
      </div>

      <div class="card" v-for="(item,index) in actListLeft" :key="index">
        <div class="imgs" v-if="item.activityImg!==''">
          <div class="cover"></div>
          <img  :src="item.activityImg" alt="">
        </div>
        <div class="content">
          <div class="time">
            {{ item.activityTime }}
          </div>
          <div class="title">
            {{ item.activityTitle }}
          </div>
          <div class="desc">
            {{ item.activityContent }}
          </div>
        </div>

        <div class="edit"  v-if="role === '3'">
          <el-button type="primary"  size="large" @click="getActInfo(item.activityId)">编辑</el-button>
          <el-popconfirm title="确认删除此活动?"  @confirm="delAct(item.activityId)" >
            <template #reference>
              <el-button type="danger" size="large">删除</el-button>
            </template>
          </el-popconfirm>

        </div>

      </div>

    </div>
    <div class="right">
      <div class="card" v-for="(item,index) in actListRight" :key="index">
        <div class="imgs" v-if="item.activityImg!==''">
          <div class="cover"></div>
          <img  :src="item.activityImg" alt="">
        </div>
        <div class="content">
          <div class="time">
            {{ item.activityTime }}
          </div>
          <div class="title">
            {{ item.activityTitle }}
          </div>
          <div class="desc">
            {{ item.activityContent }}
          </div>
        </div>

        <div class="edit"  v-if="role === '3'">
          <el-button type="primary"  size="large" @click="getActInfo(item.activityId)">编辑</el-button>
          <el-popconfirm title="确认删除此活动?"  @confirm="delAct(item.activityId)" >
            <template #reference>
              <el-button type="danger" size="large">删除</el-button>
            </template>
          </el-popconfirm>
        </div>

      </div>
    </div>
  </div>

</template>

<style scoped>
.contain{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: -24px;
}
.contain >div{
  width: 49%;
}

.left .card h1{
  font-size: 16px;
  margin-bottom: 12px;
  font-weight: 600;
}

.card{
  box-shadow: rgba(0, 0, 0, 0.06) 0 5px 10px 0;
  border-radius: 15px;
  background-color: white;
  padding: 24px;
  margin-bottom: 24px;
}

.card .imgs{
  width: 100%;
  height: 250px;
  position: relative;

}
.card .imgs img{
  height: 100%;
  width: 100%;
  border-radius: 12px;
}
.card .imgs .cover{
  border-radius: 12px;
  z-index: 99;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0))
}

.card .content .time{
  margin-top: 24px;
  color: #718096;
  font-size: 14px;
}
.card .content .title{
  font-size: 18px;
  font-weight: 600;
}
.card .content .desc{
  color: #718096;
  font-size: 16px;
  margin-top: 18px;
}
.card .edit{
  margin-top: 24px;
  display: flex;
  justify-content: right;
}

.submit {
  display: flex;
  justify-content: right;
}
</style>