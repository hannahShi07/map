<template>
  <div class="collection" v-cloak>
    <div class="logo-top clearfix">
      <!-- 选择年份 -->
      <div class="year">
        <i class="iconfont icon-xingzhuang1357kaobei lt" @click="reduceYear"></i>
        <el-date-picker
          v-model="year"
          :editable="false"
          type="year"
          format="yyyy"
          value-format="yyyy"
          @change="getList()"
          :picker-options="pickerOptions"
          :clearable="false">
        </el-date-picker>
        <div class="year-text">年</div>
        <i class="iconfont icon-xingzhuang1357 gt" @click="addYear"></i>
      </div>
    </div>
    <!-- 图表 -->
    <div id="chart-left" class="chart-left" ref="chartLeft"></div>
    <div id="chart-right" class="chart-right" ref="chartRight"></div>
    <div class="chart-right-nodata" v-show="rightNoData"></div>
    <div class="pd-20">
      <el-table class="base-table" border :data="tableData" @row-click="instructorInfo" :header-cell-style="{'text-align':'center'}"   header-row-class-name="page-table-header" v-loading="loading">
        <el-table-column type="index" label="序号" width="120" align="center"/>
        <el-table-column label="指导员姓名" min-width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'name')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系方式" min-width="160px"  align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'phone')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="驻派等级" min-width="200px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{stationGrade(isEmpty(tableData[scope.$index],'stationGrade.key'))}}</span>
          </template>
        </el-table-column>

        <el-table-column label="专职/兼职" min-width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isFullTime(isEmpty(tableData[scope.$index],'isFullTime.key'))}}</span>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>
      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
    </div>
    <instructor-info ref="refInit"></instructor-info>
  </div>
</template>

<script>
const echarts = require('echarts');
import db from '@/utils/localstorage'//  获取用户登录id
import commonReq  from "@/api/public/commonReq.js"
import InstructorInfo from './instructor-info'
import {getInstructorChars, getInstructorList} from "@/api/front/corporate/care/instructor/instructor.js"
export default {
  name: "index",
  components: {InstructorInfo},
  data () {
    return {
      total:0,
      pageNum:1,
      pageSize:10,
      year:'',
      orgCode:'',
      orgName:'',
      tableData:[],
      rightNoData: true,
      list:[],
      stationList:[],
      positionList:[],
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
    this.year=new Date().getFullYear()-1+"";
    this.getTerm();
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
        "year":this.year
      }
      getInstructorChars(params).then(response => {
        this.initCharts(response[0].numVoList)
      }).finally(() => {

      });
    },
    //创建统计图
    initCharts (data) {
      let myChartLeft = echarts.init(this.$refs.chartLeft);
      let myChartRight = echarts.init(this.$refs.chartRight);
      let arryLeft = [['amount', 'product']];
      let rightName = [];
      let arryRight = [];
      let size = 0;
      // 设置柱状图数据
      for(let i=0;i<data.length;i++){
        arryLeft[i+1]=[data[i].num, data[i].stationGrade.data];
        arryRight.push({value:data[i].size,name:data[i].stationGrade.data});
        size += Number(data[i].size);
        rightName[i]=data[i].stationGrade.data;
      }
      // 绘制图表
      myChartLeft.setOption({
        dataset: {
          source:arryLeft
        },
        grid: {
          containLabel: true,
          left:47,
          right:80
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            lineStyle: {
              show:false
            },
          },
          axisTick:{
            show:false,
          },
          splitLine: {
            show:false
          },
        },
        yAxis: {
          type: 'category',
          axisLabel: {
            lineStyle: {
              show:false
            },
          },
          axisTick:{
            show:false,
          }
        },
        series: [
          {
            type: 'bar',
            barWidth: 30, // 设置柱的宽度
            encode: {
              // Map the "amount" column to X axis.
              x: 'amount',
              // Map the "product" column to Y axis
              y: 'product'
            },
            itemStyle: {
              normal: {
                color:function (params){
                  var colorList = ['#FA7459','#FA9A53','#FAC04E','#FAC14E'];
                  return colorList[params.dataIndex];
                },
              },
            }
          },
        ]
      });
      // 绘制图表
      if(size > 0){
        this.rightNoData=false;
      }else{
        this.rightNoData=true;
      }
      myChartRight.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          bottom:10,
          data: rightName
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '55%'],
            stillShowZeroSum:false,
            label: {
              show: size>0?true:false,
              fontSize: '16',
              fontWeight: 'bold',
            },
            data: arryRight,
            itemStyle: {
              color: {
                global: '#ccc' // 缺省为 false
              },
              opacity:0.6,
              normal: {
                color:function (params){
                  var colorList = ['#FA7458','#FA9A53','#FAC04E'];
                  return colorList[params.dataIndex];
                },
              },
            },
            axisLabel:{
              lineStyle:{
                color:"#ccc"
              }
            }
          }
        ],
      });
    },
    getTerm(){
      let params = {
        types:['station_grade','position_type']
      }
      commonReq.getHistoryDict(params).then(response =>{
        this.stationList=response.station_grade;
        this.positionList=response.position_type;
      })
    },
    getList(){
      this.getCharts();
      this.loading=true;
      let params={
        current:this.pageNum,
        model:{
          year:this.year
        },
        size:this.pageSize
      }
      getInstructorList(params).then(response => {
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
      this.year = parseInt(this.year)+1+"";
      this.getList();
    },
    reduceYear(){
      this.year = parseInt(this.year)-1+"";
      this.getList();
    },
    stationGrade(val){
      for(let i=0;i<this.stationList.length;i++){
        if(this.stationList[i].id == val){
          return this.stationList[i].name;
        }
      }
      return "--";
    },
    isFullTime(val){
      for(let i=0;i<this.positionList.length;i++){
        if(this.positionList[i].id == val){
          return this.positionList[i].name;
        }
      }
      return "--";
    },
    instructorInfo(row){
      this.$refs['refInit'].show(row)
    }
  }
}
</script>

<style lang="scss" scoped>
  .base-table /deep/ tr td:hover{
    cursor: pointer;
  }
  .chart-left,.chart-right{
    height: 387px;
    margin: 20px 0;
  }
  .chart-left{
    width: calc(60% - 10px);
  }
  .chart-right{
    width: calc(40% - 10px);
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
    float: left;
  }
  #chart-right{
    padding-top: 20px;
    background-color: #fff;
    float: right;
  }
  .chart-right-nodata{
    position: absolute;
    top: 183px;
    right: 12%;
    width: 202px;
    height: 202px;
    border:28px solid #eee;
    border-radius: 50%;
  }
  .pd-20{
    display: inline-block;
    width: 100%;
  }
  .year{
    width: 100px;
    display: inline-block;
    background-color: #fff;
    position: absolute;
    right: 20px;
    z-index: 10;
  }
  .lt,.gt{
    height: 36px;
    width: 15px;
    padding:10px 0;
    display: inline-block;
    cursor: pointer;
    float: left;
  }
  .year >>> .el-input__inner{
    border:none;
    outline: none;
    padding:0;
    cursor:pointer;
    width: 38px;
    display: inline-block;
    font-size: 16px;
  }
  .year >>> .el-icon-date::before{
    content: "";
  }
  .year >>> .el-date-editor--year{
    width: 38px;
    float: left;
    margin-left:7px;
  }
  .year-text{
    font-size: 16px;
    height: 36px;
    line-height: 36px;
    width: 16px;
    float: left;
    margin-right: 7px;
  }
</style>
