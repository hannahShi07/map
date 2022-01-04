<template>
  <div class="collection" v-cloak>
    <!-- 图表 -->
    <div id="chart-left" class="chart-left" ref="chartLeft"></div>
    <div id="chart-right" class="chart-right" ref="chartRight"></div>
    <div class="pd-20">
      <el-table class="base-table" border :data="tableData" :header-cell-style="{'text-align':'center'}"   header-row-class-name="page-table-header" v-loading="loading">
        <el-table-column type="index" label="序号" width="120" align="center"/>
        <el-table-column label="企业名称" min-width="240px" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'name')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="关联党组织" min-width="240px"  align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'orgId.data')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="组织数" min-width="80px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'orgNum')}}</span>
            <!-- <span>--</span> -->
          </template>
        </el-table-column>

        <el-table-column label="党员数" min-width="80px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'memberNum')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="企业状态" min-width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'state.data')}}</span>
            <!-- <span>--</span> -->
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>
      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
    </div>
  </div>
</template>

<script>
const echarts = require('echarts');
import db from '@/utils/localstorage'//  获取用户登录id
import commonReq  from "@/api/public/commonReq.js"
import {getInformationList,getInformationChars} from "@/api/front/corporate/care/information/information.js"
export default {
  name: "index",
  components: {},
  data () {
    return {
      total:0,
      pageNum:1,
      pageSize:10,
      noticeDate:'',
      orgCode:'',
      orgName:'',
      tableData:[],
      adminName:'',
      name:'',
      nature:0,
      list:[],
      loading:false,
      pickerOptions:{
        disabledDate(time) {
          if (new Date().getFullYear()+1 <= time.getFullYear()) {
            return true
          }
          return false
        }
      }
    }
  },
  mounted(){
    this.getList();
    this.resizefun = () => {
      this.$echarts.init(document.getElementById("chart-left")).resize();
      this.$echarts.init(document.getElementById("chart-right")).resize();
    };
    window.addEventListener("resize", this.resizefun);
  },
  activated() {
    this.resizefun = () => {
      this.$echarts.init(document.getElementById("chart-left")).resize();
      this.$echarts.init(document.getElementById("chart-right")).resize();
    };
    window.addEventListener("resize", this.resizefun);
  },
  //移除事件监听，避免内存泄漏
  deactivated() {
    window.removeEventListener("resize", this.resizefun);
    this.resizefun = null;
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizefun);
    this.resizefun = null;
  },
  methods: {
    //获取统计图数据
    getCharts (){
      let params = {
        "adminName": this.adminName,
        "name": this.name,
        "nature": this.nature
      }
      getInformationChars(params).then(response => {
        this.initCharts(response.entAddCnt,response.entCnt)
      }).finally(() => {

      });
    },
    //创建统计图
    initCharts (entAddCnt,entCnt) {
      let myChart = echarts.init(this.$refs.chartLeft);
      // 绘制图表
      let entAddCntName=[];
      let entAddCntNum=[];
      let entCntName=[];
      let entCntNum=[];
      for(let i=0;i<entAddCnt.length;i++){
        entAddCntName[i]=entAddCnt[i].year;
        entAddCntNum[i]=entAddCnt[i].num;
      }
      for(let i=0;i<entCnt.length;i++){
        entCntName[i]=entAddCnt[i].year;
        entCntNum[i]=entAddCnt[i].num;
      }
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['每年增量']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: entAddCntName
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show:true,
              lineStyle:{
                type:'dashed'
              }
            },
          }
        ],
        series: [
          {
            name: '每年增量',
            type: 'line',
            lineStyle:{
              color: '#FAC14E'
            },
            itemStyle:{
              color: '#FAC14E'
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(250,135,78,0.2)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(250,193,78,0.2)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            data: entAddCntNum
          }
        ]
      });
      let myChartRight = echarts.init(this.$refs.chartRight);
      myChartRight.setOption({
        tooltip: {
          axisPointer: {
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: ['企业数量']
        },
        xAxis: [
          {
            type: 'category',
            data: entCntName,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '',
            axisLabel: {
              formatter: '{value}',
              interval:'auto'
            },
            nameTextStyle: {
              minInterval: 1
            },
            axisTick:{
              interval:'auto'
            },
            splitLine: {
              show:true,
              lineStyle:{
                type:'dashed'
              }
            }
          },
        ],
        series: [
          {
            name: '企业数量',
            type: 'bar',
            data: entCntNum,
            itemStyle:{
              color:'#FAC14E',
              barBorderRadius:[10, 10, 0, 0]
            },
            barWidth: 20
          }
        ]
      });
    },
    getList(){
      this.getCharts();
      this.loading=true;
      let params={
        current:this.pageNum,
        model:{},
        size:this.pageSize
      }
      getInformationList(params).then(response => {
        this.total = response.total;
        this.tableData = response.records;
        this.loading=false;
      }).finally(() => {
        this.loading=false;
      });
    },
    pageChange(){
      this.getList();
    },
    addYear(){
      this.noticeDate = parseInt(this.noticeDate)+1+"";
      this.getList();
    },
    reduceYear(){
      this.noticeDate = parseInt(this.noticeDate)-1+"";
      this.getList();
    }
  }
}
</script>

<style lang="scss" scoped>
  .chart-left,.chart-right{
    width: calc(50% - 10px);
    height: 387px;
    margin-bottom: 20px;
  }
  /*.logo-top{*/
    /*padding:14px 20px;*/
    /*padding-bottom:0;*/
  /*}*/
  .logotxt{
    display:flex;
    align-items:center;
    line-height:36px;
    font-size: 16px;
    color: #7D7D7D;
  }
  .logotxt img{
    width:21px;
    height:17px;
    margin-right:8px;
  }
  .line{
    width:100%;
    height:20px;
    background:#eee;
  }
  .teble-line{
    width:100%;
    height:10px;
    background:#eee;
  }
  .collection{
    min-width: 1318px;
    position: relative;
    background-color: #eee;
  }
  .collection >>> .el-tooltip{
    width: 100% !important;
  }
  .collection >>> .base-table tr td:nth-of-type(2n){
    font-weight: 400;
  }
  #chart-left{
    padding-top: 20px;
    background-color: #fff;
    width: calc(50% - 10px);
    float: left;
  }
  #chart-right{
    padding-top: 20px;
    background-color: #fff;
    width: calc(50% - 10px);
    float: right;
  }
  .pd-20{
    display: inline-block;
    width: 100%;
  }
</style>
