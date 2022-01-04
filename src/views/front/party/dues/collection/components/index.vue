<template>
  <div class="collection" v-cloak>
    <div class="logo-top clearfix">
      <div class="logotxt fl">
        <img src="../../../../../../assets/page/icon-logo.png">
        <span>{{orgName}}</span>
      </div>
      <div class="fr">
        <base-label-box label="选择党组织">
          <el-select filterable placeholder="请输入或选择" v-model='orgCode' value-key="id" style="width: 360px" clearable @change="selectChange" >
            <el-option
              v-for="(item, index) in list"
              :key="index"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </base-label-box>
      </div>
    </div>
    <div class="line"></div>
    <!-- 选择年份 -->
    <div class="year">
      <i class="iconfont icon-xingzhuang1357kaobei lt" @click="reduceYear"></i>
      <el-date-picker
        v-model="noticeDate"
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
    <!-- 图表 -->
    <div id="chart" class="chart" ref="chart" style="width:100%"></div>
    <div class="teble-line"></div>
    <div class="pd-20">
      <el-table class="base-table" border :data="tableData" @row-click="collectionInfo" :header-cell-style="{'text-align':'center'}"   header-row-class-name="page-table-header" v-loading="loading">
        <el-table-column type="index" label="序号" width="120" align="center"/>
        <el-table-column label="组织名称" min-width="240px" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'org.data')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="第一季度" width="120px"  align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'stateOne.data')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="第二季度" width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'stateSec.data')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="第三季度" width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'stateTh.data')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="第四季度" width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'stateFou.data')}}</span>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>
      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      <collection-info ref="refInit"></collection-info>
    </div>
  </div>
</template>

<script>
const echarts = require('echarts');
import CollectionInfo from './collection-info';
import db from '@/utils/localstorage'//  获取用户登录id
import commonReq  from "@/api/public/commonReq.js"
import {getCollection, getCollectionList} from "@/api/front/party/dues/collection/collection.js"
export default {
  name: "index",
  components: {CollectionInfo},
  data () {
    return {
      total:0,
      pageNum:1,
      pageSize:10,
      noticeDate:'',
      orgCode:'',
      orgName:'',
      tableData:[
        {
          collectionDate: "",//缴纳时间
          memberName: "",//	党员名称
          org: {//	组织
            data: "",
            key: 0
          },
          orgCode: 0,//	组织编码
          orgId: 0,//组织id
          orgName: "XXX组织",//组织名称
          stateFou: {//第四季度是否交清
            data: "已缴",
            key: 0
          },
          stateOne: {//第一季度是否交清
            data: "已缴",
            key: 0
          },
          stateSec: {//第二季度是否交清
            data: "已缴",
            key: 0
          },
          stateTh: {//第三季度是否交清
            data: "已缴",
            key: 0
          },
          totalAmount: 0//缴纳总额
        }
      ],
      chartData:[
        {
          collectionDate: "",//缴纳时间
          collectionQuarter: {//缴费季度
            data: "",
            key: 0
          },
          totalAmount: 0//缴纳总额
        }
      ],
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
    this.noticeDate=new Date().getFullYear()-1+"";
    // this.getUser();
    this.getOrg();
    // this.getList();
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
    //获取用户信息
    getUser(){
      let params = {
        userId:db.get('USER').id,
      }
      commonReq.getUserinformation(params).then(response => {
        const res = response;
        this.orgName=res.data.orgName;
        this.orgCode=res.data.orgCode;
        // this.getStatistics();
        this.getList ();

      })
    },
    //选择党组织
    getOrg(){
      let params={

      }
      commonReq.getOrglist(params).then(response => {
        const res = response;
        if(res && res.length <= 0){
          this.list = []
          this.orgCode = ""
        }else{
          this.list=res;
          this.getUser();
        }
      })
    },
    //选择党组织
    selectChange(value){
      if(this.list!='' && this.list!=undefined && this.list!=null && this.list!='null' && this.list.length>0){
        for(var i=0;i<this.list.length;i++){
          if(value==this.list[i].code){
            this.orgName=this.list[i].name;
          }
        }
        // this.getPartyStatistics();
        this.pageChange();
      }
    },
    //获取统计图数据
    getCharts (){
      let params = {
        "collectionDate":this.noticeDate,
        "orgCode": this.orgCode
      }
      getCollection(params).then(response => {
        this.initCharts(response)
      }).finally(() => {

      });
    },
    //创建统计图
    initCharts (data) {
      let myChart = echarts.init(this.$refs.chart);
      // 绘制图表
      let collectionQuarter=[];
      for(let i=0;i<4;i++){
        if(data[i]){
          collectionQuarter[i] = data[i].totalAmount;
        }else{
          collectionQuarter[i] = 0;
        }
      }
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
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
            data: ['第一季度', '第二季度', '第三季度', '第四季度']
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
            data: collectionQuarter
          }
        ]
      });
    },
    getList(){
      this.getCharts();
      this.loading=true;
      let params={
        current:this.pageNum,
        model:{
          collectionDate:this.noticeDate,//公示年份
          orgCode:this.orgCode,//组织编码，前台参数后台传空
        },
        size:this.pageSize
      }
      getCollectionList(params).then(response => {
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
    collectionInfo(row){
      this.$refs['refInit'].show(row.org.key,row.org.data,this.noticeDate)
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
  }
  .collection >>> .el-tooltip{
    width: 100% !important;
  }
  .collection >>> .base-table tr td:nth-of-type(2n){
    font-weight: 400;
  }
  #chart{
    padding-top: 20px;
    background-color: #fff;
  }
  .year{
    width: 100px;
    display: inline-block;
    background-color: #fff;
    position: absolute;
    right: 44px;
    z-index: 999;
    margin-top: 24px;
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
