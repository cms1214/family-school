<script setup>
import Comment from "@/views/components/childs/Comment.vue";
import * as echarts from 'echarts';
import {onMounted, ref} from "vue";

const chartRef = ref();
let myChart = null;

const option = {
  legend: {
    left: 'center',
    top: 'bottom'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  series: [
    {
      name: '成绩',
      type: 'pie',
      radius: [30, 150],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      data: [
        { value: 82, name: '语文' },
        { value: 99, name: '数学' },
        { value: 59, name: '英语' },
        { value: 90, name: '思政' },
        { value: 72, name: '体育' },
        { value: 80, name: '美术' },
        { value: 90, name: '音乐' },
        { value: 99, name: '微机' }
      ]
    }
  ]
};

onMounted(() => {
  myChart = echarts.init(chartRef.value);
  option && myChart.setOption(option);

  window.addEventListener('resize', resizeHandler);
});

const resizeHandler = (myChart) => {
  myChart && myChart.resize();
}


const tableData = [
  {
    date: '2024-12-08 / 08:22',
    address: '西南科大北1门',
  },
  {
    date: '2024-12-09 / 08:25',
    address: '西南科大北1门',
  },
  {
    date: '2024-12-10 / 08:20',
    address: '西南科大东2门',
  },
  {
    date: '2024-12-11 / 08:18',
    address: '西南科大东2门',
  },
  {
    date: '2024-12-08 / 08:22',
    address: '西南科大东2门',
  },
  {
    date: '2024-12-09 / 08:25',
    address: '西南科大东2门',
  },
  {
    date: '2024-12-10 / 08:20',
    address: '西南科大东2门',
  },
  {
    date: '2024-12-11 / 08:18',
    address: '西南科大东1门',
  },
  {
    date: '2024-12-08 / 08:22',
    address: '西南科大东1门',
  },
  {
    date: '2024-12-09 / 08:25',
    address: '西南科大东1门',
  },
  {
    date: '2024-12-10 / 08:20',
    address: '西南科大东1门',
  },
  {
    date: '2024-12-11 / 08:18',
    address: '西南科大东2门',
  },
]


</script>

<template>
  <div class="contain">
    <div class="grade">
      <h1>学生成绩</h1>
      <div class="chart" ref="chartRef"></div>
    </div>
    <div class="check">
      <h1>刷卡记录</h1>
      <el-table :data="tableData" style="width: 100%" stripe >
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </div>
  </div>

  <Comment></Comment>
</template>

<style scoped>
.contain{
  display: flex;
  margin-bottom: 24px;
  justify-content: space-between;
}
.contain>div{
  box-shadow: rgba(0, 0, 0, 0.06) 0px 5px 10px 0px;
  border-radius: 15px;
  background-color: white;
  padding: 24px;
}
.grade{
  flex: 0.63;
}
.check{
  flex: 0.35;
}
.contain>div>h1{
  font-size: 16px;
  margin-bottom: 12px;
  font-weight: 600;
}

.grade .chart{
  height: 400px;
}
.contain .el-table {
  height: 400px;
}
</style>