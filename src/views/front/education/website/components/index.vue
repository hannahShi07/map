<template>
  <div class="site" v-cloak>
    <!-- 图表 -->
    <div id="chart" class="chart" ref="chart" style="width:100%;"></div>
    <div class="teble-line"></div>
    <div class="pd-20">
      <el-table class="base-table" border :data="tableData" @row-click="siteInfo" :header-cell-style="{'text-align':'center'}"   header-row-class-name="page-table-header" v-loading="loading">
        <el-table-column type="index" label="序号" width="120" align="center"/>
        <el-table-column label="站点名称" min-width="200px" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="cursor:pointer" @click="siteInfo(tableData[scope.$index].id)">{{isEmpty(tableData[scope.$index],'name')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="站点地址" min-width="200px"  align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'address')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="建立日期" min-width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'buildDate')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="站点面积m²" min-width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'area')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="站点管理员" min-width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'manager')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="教育设备" min-width="200px" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'equipment')}}</span>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>
      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
    </div>
    <site-info ref="refInit"></site-info>
  </div>
</template>

<script>
const echarts = require('echarts');
import SiteInfo from './site-info';
import db from '@/utils/localstorage'//  获取用户登录id
import commonReq  from "@/api/public/commonReq.js"
import {getSite, getSiteList} from "@/api/front/education/website/website.js"
export default {
  name: "index",
  components: {SiteInfo},
  data () {
    return {
      total:0,
      pageNum:1,
      pageSize:10,
      orgCode:'',
      orgName:'',
      tableData:[],
      chartData:[],
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
      this.$echarts.init(document.getElementById("chart")).resize();
    };
    window.addEventListener("resize", this.resizefun);
  },
  activated() {
    this.resizefun = () => {
      this.$echarts.init(document.getElementById("chart")).resize();
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
      let params = {};
      getSite(params).then(response => {
        this.initCharts(response)
      }).finally(() => {

      });
    },
    //创建统计图
    initCharts (data) {
      let myChart = echarts.init(this.$refs.chart);
      // 绘制图表
      let year=[];
      let total=[];
      let increment=[];
      let _this=this;
      for(let i=0;i<data.length;i++){
        year.push(data[i].year)
        total.push(data[i].total)
        increment.push(data[i].increment)
      }
      myChart.setOption({
        tooltip: {
          axisPointer: {
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: ['站点数量', '站点增量']
        },
        xAxis: [
          {
            type: 'category',
            data: year,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '站点数量',
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
            },
            max:Math.ceil(Math.max.apply(null,total)/5)*5,//解决双Y轴左右刻度不对齐
            interval:Math.ceil(Math.max.apply(null,total)/5),
            min:0
          },
          {
            type: 'value',
            name: '站点增量',
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
            },
            max:Math.min.apply(null,increment)<0?(Math.ceil((Math.max.apply(null,increment)-Math.min.apply(null,increment))/5)*5+Math.min.apply(null,increment)):Math.ceil(Math.max.apply(null,increment)/5)*5,//解决双Y轴左右刻度不对齐
            interval:Math.min.apply(null,increment)<0?(Math.ceil((Math.max.apply(null,increment)-Math.min.apply(null,increment))/5)):Math.ceil(Math.max.apply(null,increment)/5),
            min:Math.min.apply(null,increment)<0?(Math.min.apply(null,increment)):0
          }
        ],
        series: [
          {
            name: '站点增量',
            type: 'bar',
            data: increment,
            itemStyle:{
              color:'#FAC14E',
              barBorderRadius:[10, 10, 0, 0]
            },
            barWidth: 20
          },
          {
            name: '站点数量',
            itemStyle:{
              color: '#FAC14E'
            },
            lineStyle:{
              color: '#FAC14E'
            },
            type: 'line',
            yAxisIndex: 1,
            data: total
          }
        ]
      });
    },
    getList(){
      this.getCharts();
      this.loading=true;
      let params={
        current:this.pageNum,
        address:"",
        buildDate:"",
        address:"",
        name:this.pageSize
      }
      getSiteList(params).then(response => {
        // console.log(response)
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
    siteInfo(row){
      this.$refs['refInit'].show(row.id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .base-table /deep/ tr th{
    box-sizing:boder-box
  }
  .base-table /deep/ tr td{
    box-sizing:boder-box;
    color:#7D7D7D;
    font-weight: 400;
  }
  .base-table /deep/ tr td:hover{
    cursor: pointer;
  }
  .base-table /deep/ .cell.el-tooltip{
    width:auto!important;
  }
  .chart{
    width: 100%;
    height: 387px;
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
  .site{
    min-width: 1318px;
    position: relative;
  }
  .site >>> .el-tooltip{
    width: 100% !important;
  }
  .site >>> .base-table tr td:nth-of-type(2n){
    font-weight: 400;
  }
  #chart{
    padding-top: 20px;
    background-color: #fff;
  }
</style>
