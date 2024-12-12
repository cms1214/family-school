<script setup>
import {h, onMounted, ref} from "vue";
import {
  delHomeworkApi, getHomeworkByIdApi,
  getHomeworkPageApi,
  getStudentInfoApi,
  getStudentPageApi, updateHomeworkApi,
  updateStudentApi
} from "@/api/user.js";
import {ElNotification} from "element-plus";

const studentList = ref([])
const totalCount= ref()
const pageSize= ref(8)


/*****************************************************获取学生信息*******************************************************/
const countStudentPage = ref(1);
const getStudentInfo = (num)=>{
  getStudentPageApi({
    currentPage: num,
    pageSize: pageSize.value
  }).then((res)=>{
    if(res.code===0){
      totalCount.value = res.data.items.totalCount;
      studentList.value = res.data.items.dataList;
    }
  })
}


/*****************************************************获取作业信息*******************************************************/
const workList = ref([])
const work_totalCount= ref()
const work_pageSize= ref(5)

const work_countPage = ref(1);

const getHomeworkInfo = (num)=>{
  getHomeworkPageApi({
    currentPage: num,
    pageSize: work_pageSize.value
  }).then((res)=>{
    if(res.code===0){
      work_totalCount.value = res.data.items.totalCount;
      workList.value = res.data.items.dataList;
    }
  })
}

onMounted(()=>{
  getStudentInfo()
  getHomeworkInfo()
})


/*****************************************************编辑学生信息*******************************************************/
const editStudentVisible = ref(false)

const studentForm = ref({
  studentId: null,
  xuehao: '',
  studentName: '',
  studentSex: null,
  studentAge: '',
  studentPwd: '',
  comment: ''
})

const editStudent = (xuehao)=>{
  // 打开弹窗
  editStudentVisible.value = true

  // get对应学生的信息
  getStudentInfoApi(xuehao).then(res=>{
    if(res.code===0){
      studentForm.value = res.data.item
    }
  })
}

// 点击发送修改请求
const editStudentSubmit = ()=>{
  editStudentVisible.value = false

  console.log(studentForm.value)

  updateStudentApi({
    studentId: studentForm.value.studentId,
    xuehao: studentForm.value.xuehao,
    studentName: studentForm.value.studentName,
    studentSex: studentForm.value.studentSex,
    studentAge: studentForm.value.studentAge,
    studentPwd: studentForm.value.studentPwd,
  }).then(res=>{
    getStudentInfo(countStudentPage.value)
    ElNotification({
      title: '修改成功',
      message: h('i', { style: 'color: teal' }, studentForm.value.studentName+'同学的信息已修改'),
      type: 'success',
    })
  })
}

/*****************************************************修改学生评语*******************************************************/
const editStudentCommentVisible = ref(false)

const editStudentComment = (xuehao)=>{
  // 打开弹窗
  editStudentCommentVisible.value = true

  // get对应学生的信息
  getStudentInfoApi(xuehao).then(res=>{
    if(res.code===0){
      studentForm.value = res.data.item
    }
  })
}

// 点击发送修改请求
const editStudentCommentSubmit = ()=>{
  editStudentCommentVisible.value = false

  console.log(studentForm.value)

  updateStudentApi({
    studentId: studentForm.value.studentId,
    comment: studentForm.value.comment,
    xuehao: studentForm.value.xuehao,
    studentPwd: studentForm.value.studentPwd,
  }).then(res=>{
    getStudentInfo(countStudentPage.value)
    ElNotification({
      title: '修改成功',
      message: h('i', { style: 'color: teal' }, studentForm.value.studentName+'评价已修改'),
      type: 'success',
    })
  })
}





/************************************* 分割线  **************************************/
/********************************** 以下是作业管理  **************************************/


const homeworkData = ref({
  homeworkId: null,
  homeworkTitle: '',
  homeworkContent: '',
})

const editHomeworkVisible = ref(false)

const editHomework = (homeworkId)=>{

  editHomeworkVisible.value = true
  getHomeworkByIdApi(homeworkId).then(res=>{
    if(res.code===0){
      console.log(res)
      homeworkData.value = res.data.homework
    }
  })
}

const editHomeworkSubmit = ()=>{
  editHomeworkVisible.value = false
  updateHomeworkApi({
    homeworkId: homeworkData.value.homeworkId,
    homeworkTitle: homeworkData.value.homeworkTitle,
    homeworkContent: homeworkData.value.homeworkContent,
  }).then(res=>{
    getHomeworkInfo(work_countPage.value)
    ElNotification({
      title: '修改成功',
      message: h('i', { style: 'color: teal' }, homeworkData.value.homeworkTitle+'作业已修改'),
      type:'success',
    })
  })
}


const delHomework = (homeworkId)=>{
  // 删除作业
  delHomeworkApi(homeworkId).then(res=>{
    if(res.code===0){
      getHomeworkInfo(work_countPage.value)
      ElNotification({
        title: '删除成功',
        message: h('i', { style: 'color: teal' }, '作业已删除'),
        type: 'success',
      })
    }
  })
}




</script>

<template>


<!---------------------------修改学生信息的弹窗----------------------------->
  <el-dialog
    title="修改学生信息"
    width="500"
    v-model="editStudentVisible"
  >
      <div class="dialog-footer">

        <el-form
          ref="formRef"
          label-width="auto"
          class="demo-dynamic"
        >
          <el-form-item label="学号" prop="xuehao" size="large">
            <el-input v-model="studentForm.xuehao" placeholder="请输入学号"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="studentName" size="large">
            <el-input v-model="studentForm.studentName" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="studentSex">
            <el-radio-group v-model="studentForm.studentSex">
              <el-radio :value="1">男</el-radio>
              <el-radio :value="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄" prop="studentAge" size="large">
            <el-input v-model="studentForm.studentAge" placeholder="请输入年龄"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="studentPwd" size="large">
            <el-input v-model="studentForm.studentPwd" placeholder="请输入密码"></el-input>
          </el-form-item>

        </el-form>


        <el-button @click="editStudentVisible = false">取消</el-button>
        <el-button type="primary" @click="editStudentSubmit">
          确认
        </el-button>
      </div>
  </el-dialog>


  <!---------------------------学生评语的弹窗----------------------------->

  <el-dialog
      title="学生评价"
      width="500"
      v-model="editStudentCommentVisible"
  >
    <div class="dialog-footer">

      <el-form
          ref="formRef"
          label-width="auto"
          class="demo-dynamic"
      >
        <el-form-item label="评价" size="large">
          <el-input v-model="studentForm.comment" placeholder="请输入评语" type="textarea" :rows="5"></el-input>
        </el-form-item>

      </el-form>
      <el-button @click="editStudentCommentVisible = false">取消</el-button>
      <el-button type="primary" @click="editStudentCommentSubmit()">
        修改
      </el-button>
    </div>
  </el-dialog>



  <!---------------------------修改作业的弹窗----------------------------->
  <el-dialog
      title="修改作业信息"
      width="500"
      v-model="editHomeworkVisible"
  >
    <div class="dialog-footer">

      <el-form
          ref="formRef"
          label-width="auto"
          class="demo-dynamic"
      >
        <el-form-item label="作业标题" prop="homeworkTitle" size="large">
          <el-input v-model="homeworkData.homeworkTitle" placeholder="请输入作业标题"></el-input>
        </el-form-item>
        <el-form-item label="评价" size="large">
          <el-input v-model="homeworkData.homeworkContent" placeholder="请输入作业内容" type="textarea" :rows="5"></el-input>
        </el-form-item>

      </el-form>
      <el-button @click="editHomeworkVisible = false">取消</el-button>
      <el-button type="primary" @click="editHomeworkSubmit()">
        修改
      </el-button>
    </div>
  </el-dialog>


  <div class="contain">

<!-------------------------------------------------学生管理------------------------------------------------------------>
    <div class="student">
      <h1>学生列表</h1>
      <div class="work-header">
        <p class="item1">姓名</p>
        <p class="item2">性别</p>
        <p class="item3">年龄</p>
        <p class="item4">状态</p>
        <p class="item5">成绩</p>
      </div>
      <div class="work-list">

        <div class="card" v-for="student in studentList">
          <div class="line"></div>
          <div class="items">
            <div class="item1">
              <img :src="student.avatar" alt="">
              <div class="text">
                <h1>{{student.studentName}}</h1>
                <p>{{student.xuehao}}</p>
              </div>

            </div>
            <div class="item2">{{student.studentSex===1?"男":"女"}}</div>
            <div class="item3">{{student.studentAge }}</div>
            <div class="item4"><el-tag :type="student.isOnline===1?'success':'info'">{{student.isOnline===1?"在线":"离线"}}</el-tag></div>
            <div class="item5">{{ student.score }}</div>
            <div class="item6">
              <el-button type="primary" @click="editStudentComment(student.xuehao)">评价</el-button>
              <el-button @click="editStudent(student.xuehao)">修改</el-button>
            </div>
          </div>
        </div>

      </div>

      <div class="pagination" style="display: flex;justify-content: center">
        <el-pagination
          style="margin-top: 36px"
          background layout="prev, pager, next"
          :total="totalCount"
          :page-size="pageSize"
          @current-change="getStudentInfo"
          v-model:current-page="countStudentPage"
        />
      </div>

    </div>

<!-------------------------------------------------作业管理------------------------------------------------------------>

    <div class="homework">
      <h1>作业列表（发布）</h1>

      <div class=""></div>

      <div class="work-header">
        <p class="item1">名称</p>
        <p class="item2">班级完成进度</p>
      </div>
      <div class="work-list">
        <div class="card"  v-for="homework in workList">
          <div class="line"></div>
          <div class="items">
            <div class="item1">{{ homework.homeworkTitle }}</div>
            <div class="item2">
              {{homework.process}}%
              <el-progress :percentage="homework.process" :show-text=false	/>
            </div>
            <div class="item3">
              <el-button type="primary" @click="editHomework(homework.homeworkId)">编辑</el-button>
              <el-popconfirm title="确认删除此条作业？" @confirm="delHomework(homework.homeworkId)">
                <template #reference>
                  <el-button type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination" style="display: flex;justify-content: center">
        <el-pagination
          style="margin-top: 36px"
          background layout="prev, pager, next"
          :total="work_totalCount"
          :page-size="work_pageSize"
          @current-change="getHomeworkInfo"
          v-model:current-page="work_countPage"
        />
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
.contain>div>h1{
  font-size: 16px;
  margin-bottom: 12px;
  font-weight: 600;
}

.work-header{
  display: flex;
  font-size: 12px;
  font-weight: 600;
  color: #718096;
  margin-top: 24px;
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
/******************************************学生管理***********************************************/

.student{
  margin-bottom: 24px;
}

.student .work-header .item1{
  flex: 0.3;
}
.student .work-header .item2{
  flex: 0.15;
}
.student .work-header .item3{
  flex: 0.15;
}
.student .work-header .item4{
  flex: 0.15;
}
.student .work-header .item5{
  flex: 0.25;
}


.student .work-list .item1{
  flex: 0.3;
  font-weight: 600;
  display: flex;
}
.student .work-list .item1 img{
  height: 42px;
  width: 42px;
  border-radius: 8px;
  margin-right: 8px;
}
.student .work-list .item1 .text p{
  color: #718096;
  font-weight: 400;
}
.student .work-list .item2{
  flex: 0.15;
  color: #718096;
}
.student .work-list .item3{
  flex: 0.15;
  color: #718096;
}
.student .work-list .item4{
  flex: 0.15;
  color: #718096;
}
.student .work-list .item5{
  flex: 0.10;
  color: #718096;
}
.student .work-list .item6{
  flex: 0.15;
  color: #718096;
  text-align: right;
}

/******************************************作业管理***********************************************/

.homework .work-header .item1{
  flex: 0.5;
}
.homework .work-header .item2{
  flex: 0.2;
}


.homework .work-list .item1{
  flex: 0.5;
  font-weight: 600;
}
.homework .work-list .item2{
  flex: 0.2;
  color: #718096;
}
.homework .work-list .item3{
  flex: 0.3;
  color: #718096;
  text-align: right;
}
</style>